class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  wrap_parameters false

  def create
    super do |resource|
      if resource.persisted?
        if resource.active_for_authentication?
          # 自動ログイン
          sign_in(resource)

          # トークンを生成
          client_id = SecureRandom.urlsafe_base64(nil, false)
          token     = SecureRandom.urlsafe_base64(nil, false)
          token_hash = BCrypt::Password.create(token)
          expiry    = (Time.now + DeviseTokenAuth.token_lifespan).to_i

          resource.tokens[client_id] = {
            token:  token_hash,
            expiry: expiry
          }

          resource.save!

          response.headers['uid'] = resource.uid
          response.headers['client'] = client_id
          response.headers['expiry'] = expiry
          response.headers['access-token'] = token

          # 認証トークンとユーザー情報を含むJSONを返す
          render json: {
            success: true,
            data:   {
              id: resource.id,
              name: resource.name,
            },
            message: "登録が完了しました。", # カスタムメッセージ等
          } and return
        else
          # アカウントがまだ有効でない場合の処理
          render json: { success: false, message: "アカウントが有効ではありません。" } and return
        end
      else
        # ユーザーの保存に失敗した場合
        render json: { success: false, message: resource.errors.full_messages } and return
      end
    end
  end

  private

  # def sign_up_params
  #   params.permit(:name, :email, :password, :password_confirmation)
  # end
end
