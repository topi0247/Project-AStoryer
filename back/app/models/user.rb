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
#  role               :integer          default("general")
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
  has_one :profile, dependent: :destroy
  has_many :user_notices, dependent: :destroy
  has_many :notices, through: :user_notices
  has_many :posts, dependent: :destroy

  # フォローしている人とフォローされている人を取得するためのアソシエーション
  has_many :following_relationships, class_name: 'Relationship', foreign_key: 'follower_id', dependent: :destroy, inverse_of: :follower
  has_many :follower_relationships, class_name: 'Relationship', foreign_key: 'followed_id', dependent: :destroy, inverse_of: :followed
  # フォローしている人を呼び出す
  has_many :following, through: :following_relationships, source: :followed
  # フォロワーを呼びたす
  has_many :followers, through: :follower_relationships, source: :follower

  enum role: { general: 0, admin: 1 } # general: 一般ユーザー, admin: 管理者

  def self.from_omniauth(auth)
    find_or_create_by(provider: auth.provider, uid: auth.uid) do |user|
      user.email = auth.info.email
      user.name = auth.info.name
      user.password = Devise.friendly_token[0, 20]
    end
  end

  def as_header_json
    {
      id: id,
      name: name,
      avatar: profile&.avatar&.url,
      header_image: profile&.header_image&.url,
      following_count: following.count || 0,
      follower_count: followers.count || 0,
    }
  end
end
