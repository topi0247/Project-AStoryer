class Api::V1::TagsController < ApplicationController
  def index
    tags = Tag.all.map(&:name)
    render json: tags, status: :ok
  end
end
