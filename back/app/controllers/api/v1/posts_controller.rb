require 'mini_magick'

class Api::V1::PostsController < Api::V1::BasesController
  before_action :set_post, only: %i[update]

  def create
    post = current_api_v1_user.posts.build(post_params.except(:postable_attributes))

    # 下書き以外は投稿日時保存
    if !post.draft?
      post.published_at = Time.now
    end

    # 投稿タイプに応じたクラス
    postable_type = post.initialize_postable(post_params[:postable_type])
    # 投稿タイプのクラスをインスタンス
    post.postable = postable_type.new

    begin
      # イラストの場合
      if post.illust?
        blob = post.postable.active_storage_upload!(post_params[:postable_attributes][:image])
        post.postable.image.attach(blob)
      end

      # 保存
      post.save!

      render json: { id: post.id }, status: :created
    rescue => e
      logger.error(e)
      head status: :bad_request
    end
  end

  def update
    begin
      # 投稿データのメインコンテンツの更新が可能か
      if @post.main_content_updatable?
        # イラストなら中身を書き換え
        if @post.illust?
          blob = @post.postable.active_storage_upload!(post_params[:postable_attributes][:image])
          @post.postable.image.attach(blob)
        end
      end

      # 公開設定で初公開のときは公開日時を設定
      @post.set_published_at(post_params[:publish_state])

      @post.update!(post_params.except(:postable_attributes))

      render json: { id: @post.id }, status: :ok
    rescue => e
      logger.error(e)
      head status: :bad_request
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :caption, :publish_state, :postable_type,postable_attributes: [:image])
  end

  def set_post
    @post = current_api_v1_user.posts.find(params[:id])
  end
end
