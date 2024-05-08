class Api::V1::Auth::TokenValidationsController < DeviseTokenAuth::TokenValidationsController

  protected

  def render_validate_token_success
    render json: {
      success: true,
      user: @resource.as_header_json
    }
  end
end
