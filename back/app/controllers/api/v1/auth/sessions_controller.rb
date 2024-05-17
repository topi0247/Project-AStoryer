class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  wrap_parameters false

  def create
    super
  end

  protected

  # ログイン成功時の処理オーバーライド
  def render_create_success
    render json: {
      success: true,
      user: @resource.as_header_json,
    }
  end
end
