class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
  wrap_parameters false

  def create
    super
  end

  protected

  # ログイン成功時の処理オーバーライド
  def render_create_success
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
