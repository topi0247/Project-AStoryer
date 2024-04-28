# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                 :bigint           not null, primary key
#  provider           :string           not null
#  uid                :string           default(""), not null
#  encrypted_password :string           default(""), not null
#  name               :string
#  email              :string
#  tokens             :json
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class User < ActiveRecord::Base
  extend Devise::Models
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable,
        :omniauthable, omniauth_providers: %i[google_oauth2 discord]
  include DeviseTokenAuth::Concerns::User
  has_many :authentications, dependent: :destroy
end
