class Api::V1::Auth::TokenValidationsController < DeviseTokenAuth::TokenValidationsController

  protected

  def render_validate_token_success
    Rails.logger.debug(@resource.as_header_json)
    render json: {
      success: true,
      user: @resource.as_header_json
    }
  end
end
