class Api::V1::PostsController < Api::V1::BasesController
  def create
    post = current_api_v1_user.posts.build(post_params)
    if post_params[:publish_state] != "draft"
      post.published_at = Time.now
    end

    begin
      post.save!
      render json: post, status: :created
    rescue => e
      logger.error(e)
      render json: { message: '投稿に失敗しました' }, status: :internal_server_error
    end
  end

  private

  def post_params
    params.permit(:title, :caption, :content_kind, :publish_state)
  end
end
