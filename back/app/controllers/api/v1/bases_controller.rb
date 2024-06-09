class Api::V1::BasesController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :authenticate_api_v1_user!
  before_action :set_url_options

  protected

  def resource_name
    :user
  end

  private

  def set_url_options
    ActiveStorage::Current.url_options = {
      host: request.base_url,
      protocol: request.scheme
    }
  end
end
