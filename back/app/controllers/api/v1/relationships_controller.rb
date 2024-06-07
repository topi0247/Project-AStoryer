class Api::V1::RelationshipsController < Api::V1::BasesController
  before_action :set_relationship, only: [:show, :destroy]

  def show
    render json: { isFollowing: @relationship.present? }, status: :ok
  end

  def create
    user = User.find_by_short_uuid(relationship_params[:user_uuid])
    @relationship = Relationship.new(followed_uuid: user.uuid, follower_uuid: current_api_v1_user.uuid)
    begin
      if @relationship.save!
        head :created
      else
        render json: { errors: @relationship.errors.full_messages }, status: :unprocessable_entity
      end
    rescue => e
      logger.error e
      render json: { error: e.message }, status: :bad_request
    end
  end

  def destroy
    @relationship.destroy if @relationship.present?
    head :no_content
  end

  private

  def set_relationship
    @relationship = Relationship.find_by(followed_uuid: User.find_by_short_uuid(relationship_params[:id]).uuid, follower_uuid: current_api_v1_user.uuid)
  end

  def relationship_params
    params.permit(:id, :user_uuid)
  end
end