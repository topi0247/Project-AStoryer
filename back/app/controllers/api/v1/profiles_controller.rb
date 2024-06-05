class Api::V1::ProfilesController < Api::V1::BasesController
  def update
    begin
      user = current_api_v1_user
      if user.profile.nil?
        user.build_profile
      end
      user.profile.save_header_image(profile_params[:header_image]) if profile_params[:header_image]
      user.profile.save_avatar(profile_params[:avatar]) if profile_params[:avatar]
      user.profile.text = profile_params[:text] if profile_params[:text]
      user.profile.save!
      head :ok
    rescue => e
      Rails.logger.error(e.message)
      render json: { error: e.message }, status: :bad_request
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:header_image, :avatar, :text)
  end
end