class Api::V1::AccountsController < Api::V1::BasesController
  def show
    # 通知設定取得
    notices = current_api_v1_user.user_notices.map do |user_notice|
      # データ部分をシリアライズして取得
      serialized_notice = NoticeSerializer.new(user_notice.notice).serializable_hash[:data]
      {
        # 通知の種類をキーとしてデータの部分とidをマージ
        user_notice.notice_kind => serialized_notice[:attributes].merge(id: serialized_notice[:id])
      }
    end.reduce({}, :merge) # マージして1つのハッシュにする

    account = current_api_v1_user.authentications.map do |authentication|
      if(authentication.provider == 'email')
        {
          "name"=> current_api_v1_user.name,
          # プロバイダーをキーとしてメールアドレスをマージ
          authentication.provider => authentication.uid
        }
      else
        {
          "name"=> current_api_v1_user.name,
          # メールアドレス以外はuidが不要なのでenabledをマージ
          authentication.provider => "enabled"
        }
      end
    end.reduce({}, :merge) # マージして1つのハッシュにする

    render json: {account: account, notices: notices}, status: :ok
  end

  def update
    begin
      user = current_api_v1_user
      if account_params[:email].present?
        # 認証情報の更新
        authentication = current_api_v1_user.authentications.find_by(provider: 'email')
        authentication.update!(uid: account_params[:email])
        # ユーザーが持っているuidの更新
        # TODO : 将来的にメールアドレスではなくuuidを使うようにしたい
        user.uid = account_params[:email]
        user.email = account_params[:email]
      end

      if account_params[:name].present?
        user.name = account_params[:name]
      end
      user.save!
      head :ok
    rescue
      head :bad_request
    end
  end

  private

  def account_params
    params.permit(:name, :email)
  end
end
