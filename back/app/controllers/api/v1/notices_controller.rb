class Api::V1::NoticesController < Api::V1::BasesController
  def update
    notice = current_user.notices.find(notice_params[:id])
    begin
      notice.update!(notice_params.except(:id))
      head :ok
    rescue
      head :bad_request
    end
  end

  private

  def notice_params
    params.permit(:id, %i[favorite bookmark comment follower])
  end
end
