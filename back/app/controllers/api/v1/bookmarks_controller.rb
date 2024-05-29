class Api::V1::BookmarksController < Api::V1::BasesController
  before_action :set_post_uuid

  def show
    bookmark = current_api_v1_user.bookmarks.find_by(post_uuid: @uuid)
    if bookmark.present?
      render json: { isBookmark: true }, status: :ok
    else
      render json: { isBookmark: false }, status: :ok
    end
  end

  def create
    bookmark = current_api_v1_user.bookmarks.build(post_uuid: @uuid)
    if bookmark.save
      render json: { success: true }, status: :ok
    else
      render json: { success: false }, status: :internal_server_error
    end
  end

  def destroy
    bookmark = current_api_v1_user.bookmarks.find_by(post_uuid: @uuid)
    if bookmark.destroy
      render json: { success: true }, status: :ok
    else
      render json: { success: false }, status: :internal_server_error
    end
  end

  private

  def favorite_params
    params.require(:bookmark).permit(:post_uuid)
  end

  def set_post_uuid
    if params[:bookmark].blank?
      @uuid = Post.find_by_short_uuid(params[:id]).uuid
    else
      @uuid = Post.find_by_short_uuid(favorite_params[:post_uuid]).uuid
    end
  end
end
