class ApplicationController < ActionController::API
  def index
    render json: { message: "Hello, world!" }
  end
end
