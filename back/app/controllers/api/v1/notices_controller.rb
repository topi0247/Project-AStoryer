class Api::V1::NoticesController < Api::V1::BasesController
  def update
    success = true
    notice_params.each do |notice_param|
      notice = current_api_v1_user.notices.find(notice_param["id"])
      begin
        notice.update!(notice_param.except("id"))
      rescue
        success = false
      end
    end

    if success
      head :ok
    else
      head :bad_request
    end
  end

  private

  def notice_params
    # 配列が来るので_jsonを使う
    # リクエストボディがapplication/jsonのときRailsが自動でパースしてくれる、その時使うのが_json
    params.require(:_json).map do |param|
      param.permit(:favorite, :bookmark, :comment, :follower, :id)
    end
  end
end
