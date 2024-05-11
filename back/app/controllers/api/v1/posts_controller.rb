require 'mini_magick'

class Api::V1::PostsController < Api::V1::BasesController
  # 全体のエラーハンドリング
  # TODO : 特定のエラーのみ捕捉するよう修正
  rescue_from StandardError do |e|
    logger.error(e)
    render json: { message: '失敗しました' }, status: :bad_request
  end

  def create
    post = current_api_v1_user.posts.build(post_params.except(:postable_attributes))

    # 下書き以外は投稿日時保存
    if !post.draft?
      post.published_at = Time.now
    end

    # 投稿タイプに応じたクラス
    postable_type = post_params[:postable_type].constantize
    # 投稿タイプのクラスをインスタンス
    post.postable = postable_type.new

    # イラストの場合
    # TODO : 別の場所に書いたほうが良さそうな気がする
    if post.illust?
      # 送信されるデータは data: から始まるためエンコードデータのみ抽出
      data = post_params[:postable_attributes][:image]
      base64_data = data.split(",")[1]
      decoded_image = Base64.decode64(base64_data)
      # MiniMagickでwebpに軽量化
      image = MiniMagick::Image.read(decoded_image)
      image.format 'webp'
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new(image.to_blob),
        filename: SecureRandom.uuid,
        content_type: 'image/webp'
      )
      post.postable.image.attach(blob)
    end

    # 保存
    post.save!

    render json: { id: post.id }, status: :created
  end

  private

  def post_params
    params.require(:post).permit(:title, :caption, :publish_state, :postable_type,postable_attributes: [:image], tags: [:name])
  end
end
