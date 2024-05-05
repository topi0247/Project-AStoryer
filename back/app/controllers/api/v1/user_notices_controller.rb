class Api::V1::UserNoticesController < Api::V1::BasesController
  def show
      notices = current_api_v1_user.user_notices.map do |user_notice|
        # データ部分をシリアライズして取得
        serialized_notice = NoticeSerializer.new(user_notice.notice).serializable_hash[:data]
        {
          # 通知の種類をキーとしてデータの部分とidをマージ
          user_notice.notice_kind => serialized_notice[:attributes].merge(id: serialized_notice[:id])
        }
      end

      # 配列をマージしてjsonで返す
      render json: notices.reduce({}, :merge), status: :ok
  end
end
