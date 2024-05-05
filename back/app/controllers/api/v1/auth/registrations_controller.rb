class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  wrap_parameters false

  def create
    super do |resource|
      begin
        if resource.persisted?
          if resource.active_for_authentication?
            # 認証テーブルにデータを追加
            Authentication.create!(user_id: resource.id, provider: 'email', uid: resource.email)

            # 通知設定のテーブル作成
            notice_app = Notice.create!
            UserNotice.create!(user_id: resource.id, notice_id: notice_app.id,notice_kind: UserNotice.notice_kinds[:app])
            notice_email = Notice.create!
            UserNotice.create!(user_id: resource.id, notice_id: notice_email.id,notice_kind: UserNotice.notice_kinds[:email])

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
              user:   {
                id: resource.id,
                name: resource.name,
              },
              message: "登録が完了しました。", # カスタムメッセージ等
            } and return
          else
            # アカウントがまだ有効でない場合の処理
            render json: { success: false, message: "アカウントが有効ではありません。" }  and return
          end
        else
          # ユーザーの保存に失敗した場合
          render json: { success: false, message: resource.errors.full_messages } and return
        end
      rescue => e
        # エラーが発生した場合
        render json: { success: false, message: e.message } and return
      end
    end
  end
end
