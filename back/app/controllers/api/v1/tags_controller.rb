class Api::V1::TagsController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[index]
  def index
    tags = Tag.all.map(&:name)
    render json: tags, status: :ok
  end
end
