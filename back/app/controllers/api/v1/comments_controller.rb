class Api::V1::CommentsController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[index]
  before_action :set_post

  def index
    comments = @post.comments.order(created_at: :desc).map do |comment|
      avatar = url_for(comment.user.profile&.avatar) if comment.user.profile&.avatar&.attached?
      {
        id: comment.id,
        text: comment.text,
        user: {
          id: comment.id,
          uuid: comment.user.short_uuid,
          name: comment.user.name,
          avatar: avatar
        },
        created_at: comment.created_at.strftime('%Y/%m/%d %H:%M:%S')
      }
    end
    render json: { comments: comments }, status: :ok
  end

  def create
    Comment.transaction do
      comment = Comment.new(comment_params)
      comment.user = current_api_v1_user
      @post.comments << comment
      if @post.save
        render json: { id: comment.id }, status: :created
      else
        render json: { message: 'Comment not created' }, status: :internal_server_error
        raise ActiveRecord::Rollback
      end
    end
  end

  def destroy
    Comment.transaction do
      comment = @post.comments.find_by(id: params[:id])
      if comment.nil?
        render json: { message: 'Comment not found' }, status: :not_found and return
      end

      if comment.destroy
        render json: { message: 'Comment deleted' }, status: :ok
      else
        render json: { message: 'Comment not deleted' }, status: :internal_server_error
        raise ActiveRecord::Rollback
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:text)
  end

  def set_post
    @post = Post.find_by_short_uuid(params[:post_id])
    if @post.nil?
      render json: { message: 'Post not found' }, status: 404
    end
  end
end
