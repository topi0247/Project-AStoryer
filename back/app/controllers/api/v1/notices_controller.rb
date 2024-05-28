class Api::V1::NoticesController < Api::V1::BasesController
  def update
    success = true
    notice_params.each do |notice_param|
      notice = current_api_v1_user.notices.find(notice_param["id"])
      begin
        notice.update!(notice_param.except("id"))
      rescue => e
        Rails.logger.error(e)
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
    params.permit(app: [:favorite, :bookmark, :comment, :follower, :id], email: [:favorite, :bookmark, :comment, :follower, :id]).to_h.values.flatten
  end
end
