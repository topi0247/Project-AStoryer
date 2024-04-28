class Api::V1::Auth::OmniauthCallbacksController <  DeviseTokenAuth::OmniauthCallbacksController
  # オーバーライド
  def redirect_callbacks
    auth = Authentiction.find_for_oauth(request.env['omniauth.auth'])

    # トークンを生成
    client_id = SecureRandom.urlsafe_base64(nil, false)
    token     = SecureRandom.urlsafe_base64(nil, false)
    token_hash = BCrypt::Password.create(token)
    expiry    = (Time.now + DeviseTokenAuth.token_lifespan).to_i

    # ユーザーがいたらログイン
    if auth.present?
      user = auth.user
      sign_in(user)
      save_to_redirect(user, token_hash, client_id, token, expiry)
    else
      # ユーザーがいなかったら同じメールアドレスのユーザーが居るか確認
      user = User.from_omniauth(request.env['omniauth.auth'])

      if user.persisted?
        sign_in(user)
        # ユーザーがいたら、認証情報を追加
        user.authentications.create(provider: request.env['omniauth.auth'].provider, uid: request.env['omniauth.auth'].uid)
        save_to_redirect(user, token_hash, client_id, token, expiry)
      else
        redirect_to "#{ENV['FRONT_URL']}/?status=error", allow_other_host: true
      end
    end
  end

  private

  # 保存とリダイレクト
  def save_to_redirect(user, token_hash, client_id, token, expiry)
    user.tokens[client_id] = {
      token: token_hash,
      expiry: expiry
    }

    if user.save
      redirect_to "#{ENV['FRONT_URL']}/ja/tasks?uid=#{user.uid}&token=#{token}&client=#{client_id}&expiry=#{expiry}", allow_other_host: true
    else
      redirect_to "#{ENV['FRONT_URL']}/?status=error", allow_other_host: true
    end
  end
end
