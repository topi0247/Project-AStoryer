class Api::V1::SynaliosController <Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[index]
  def index
    synalios = Synalio.all.map(&:name)
    render json: synalios, status: :ok
  end
end
