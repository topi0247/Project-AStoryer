class Api::V1::Auth::TokenValidationsController < DeviseTokenAuth::TokenValidationsController

  protected

  def render_validate_token_success

    avatar_url = nil
    if @resource.profile.present? && @resource.profile.avatar.attached?
      avatar_url = url_for(@resource.profile.avatar)
    end

    render json: {
      success: true,
      user: @resource.as_header_json(avatar_url)
    }
  end
end
