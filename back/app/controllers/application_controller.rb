class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
  def index
    render json: { message: "Hello, world!" }
  end
end
