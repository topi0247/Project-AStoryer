class Api::V1::PostsController < Api::V1::BasesController
  # 全体のエラーハンドリング
  # TODO : 特定のエラーのみ捕捉するよう修正
  rescue_from StandardError do |e|
    logger.error(e)
    render json: { message: '失敗しました' }, status: :bad_request
  end

  def create
    post = current_api_v1_user.posts.build(post_params.except(:postable_attributes))

    # 投稿タイプに応じたクラス
    postable_type = post_params[:postable_type].constantize
    # 投稿タイプのクラスをインスタンス
    post.postable = postable_type.new(post_params[:postable_attributes])

    # 下書き以外は投稿日時保存
    if !post.draft?
      post.published_at = Time.now
    end

    # 保存
    post.save!

    render json: post, status: :created
  end

  private

  def post_params
    params.require(:post).permit(:title, :caption, :publish_state, :postable_type,postable_attributes: [:image])
  end
end
