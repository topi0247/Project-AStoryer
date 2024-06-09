class Api::V1::Auth::OmniauthCallbacksController <  DeviseTokenAuth::OmniauthCallbacksController
  # オーバーライド
  def redirect_callbacks
    # トークンを生成
    client_id = SecureRandom.urlsafe_base64(nil, false)
    token     = SecureRandom.urlsafe_base64(nil, false)
    token_hash = BCrypt::Password.create(token)
    expiry    = (Time.now + DeviseTokenAuth.token_lifespan).to_i

    auth = Authentication.find_for_oauth(request.env['omniauth.auth'])
    # ユーザーがいたらログイン
    if auth.present?
      user = auth.user
      sign_in(user)
      save_to_redirect(user, token_hash, client_id, token, expiry)
    else
      User.transaction do
        # 同じメールアドレスのユーザーがいるか
        # いなかったら作成する
        user = User.from_omniauth(request.env['omniauth.auth'])

        if user.persisted?
          sign_in(user)
          save_to_redirect(user, token_hash, client_id, token, expiry)
        else
          redirect_to "#{ENV['FRONT_URL']}/?status=error", allow_other_host: true
        end
      end
    end
  end

  def failure
    redirect_to "#{ENV['FRONT_URL']}/ja/auth-failure", allow_other_host: true
  end

  private

  # 保存とリダイレクト
  def save_to_redirect(user, token_hash, client_id, token, expiry)
    user.tokens[client_id] = {
      token: token_hash,
      expiry: expiry
    }

    if user.save
      redirect_to "#{ENV['FRONT_URL']}/ja?uid=#{user.uid}&token=#{token}&client=#{client_id}&expiry=#{expiry}", allow_other_host: true
    else
      redirect_to "#{ENV['FRONT_URL']}/ja?status=error", allow_other_host: true
    end
  end

  # リソースクラスが取得できないエラーが出るので明示する
  def resource_class
    User
  end
end
