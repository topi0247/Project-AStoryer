class Api::V1::FavoritesController < Api::V1::BasesController
  before_action :set_post_uuid

  def show
    favorite = current_api_v1_user.favorites.find_by(post_uuid: @uuid)
    if favorite.present?
      render json: { isFavorite: true }, status: :ok
    else
      render json: { isFavorite: false }, status: :ok
    end
  end

  def create
    favorite = current_api_v1_user.favorites.build(post_uuid: @uuid)
    if favorite.save
      render json: { success: true }, status: :ok
    else
      render json: { success: false }, status: :internal_server_error
    end
  end

  def destroy
    favorite = current_api_v1_user.favorites.find_by(post_uuid: @uuid)
    if favorite.destroy
      render json: { success: true }, status: :ok
    else
      render json: { success: false }, status: :internal_server_error
    end
  end

  private

  def favorite_params
    params.require(:favorite).permit(:post_uuid)
  end

  def set_post_uuid
    if params[:favorite].blank?
      @uuid = Post.find_by_short_uuid(params[:id]).uuid
    else
      @uuid = Post.find_by_short_uuid(favorite_params[:post_uuid]).uuid
    end
  end
end
