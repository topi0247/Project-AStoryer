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
      user: { name: @resource.name, id: @resource.id },
    }
  end

  def resource_name
    :user
  end
end
