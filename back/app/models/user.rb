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
    transaction do
      user = find_by(email: auth.info.email)
      if user.nil?
        user = User.new(email: auth.info.email, provider: auth.provider, uid: auth.uid)
        user.name = auth.info.name if user.name.blank?
        user.password = Devise.friendly_token[0, 20] if user.encrypted_password.blank?
      end
      user.provider = auth.provider
      user.uid = auth.uid
      user.save!
      user.authentications.create!(provider: auth.provider, uid: auth.uid)
      user
    end
  rescue => e
    logger.error e
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

  def as_custom_json(posts = [])
    {
      id: id,
      name: name,
      avatar: profile&.avatar&.url,
      header_image: profile&.header_image&.url,
      profile: profile&.text,
      following_count: following.count || 0,
      follower_count: followers.count || 0,
      posts: posts,
    }
  end
end
