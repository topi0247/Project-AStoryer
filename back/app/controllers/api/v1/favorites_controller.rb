class Api::V1::FavoritesController < Api::V1::BasesController
  def create
    favorite = current_api_v1_user.favorites.build(post_id: favorite_params[:post_id])
    if favorite.save
      render json: { success: true }, status: :ok
    else
      render json: { success: false }, status: :internal_server_error
    end
  end

  def destroy
    favorite = current_api_v1_user.favorites.find_by(post_id: params[:id])
    if favorite.destroy
      render json: { success: true }, status: :ok
    else
      render json: { success: false }, status: :internal_server_error
    end
  end

  private

  def favorite_params
    params.require(:favorite).permit(:post_id)
  end
end
