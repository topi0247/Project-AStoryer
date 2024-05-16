class Api::V1::GameSystemsController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[index]

  def index
    game_systems = GameSystem.all.map(&:name)
    render json: game_systems, status: :ok
  end
end
