class Api::V1::FavoritesController < Api::V1::BasesController

  def show
    favorite = current_api_v1_user.favorites.find_by(post_uuid: params[:uuid])
    render json: { isFavorite: favorite.present? }, status: :ok
  end

  def create
    favorite = current_api_v1_user.favorites.build(post_uuid: favorite_params[:post_uuid])
    if favorite.save
      render json: { success: true }, status: :ok
    else
      render json: { success: false }, status: :internal_server_error
    end
  end

  def destroy
    favorite = current_api_v1_user.favorites.find_by(post_uuid: params[:uuid])
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
end
