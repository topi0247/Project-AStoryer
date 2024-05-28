# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  provider           :string           not null
#  uid                :string           default(""), not null
#  encrypted_password :string           default(""), not null
#  name               :string
#  email              :string
#  role               :integer          default("general")
#  tokens             :json
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  uuid               :uuid             not null, primary key
#
class User < ActiveRecord::Base
  extend Devise::Models
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable,
        :omniauthable, omniauth_providers: %i[google_oauth2 discord]
  include DeviseTokenAuth::Concerns::User
  has_many :authentications, primary_key: :uuid, foreign_key: :user_uuid, dependent: :destroy
  has_one :profile, primary_key: :uuid, foreign_key: :user_uuid, dependent: :destroy
  has_many :user_notices, primary_key: :uuid, foreign_key: :user_uuid, dependent: :destroy
  has_many :notices, through: :user_notices
  has_many :posts, primary_key: :uuid, foreign_key: :user_uuid, dependent: :destroy

  # フォローしている人とフォローされている人を取得するためのアソシエーション
  has_many :following_relationships, class_name: 'Relationship', primary_key: :uuid, foreign_key: 'follower_uuid', dependent: :destroy, inverse_of: :follower
  has_many :follower_relationships, class_name: 'Relationship', primary_key: :uuid, foreign_key: 'followed_uuid', dependent: :destroy, inverse_of: :followed
  # フォローしている人を呼び出す
  has_many :following, through: :following_relationships, source: :followed
  # フォロワーを呼びたす
  has_many :followers, through: :follower_relationships, source: :follower

  has_many :favorites, primary_key: :uuid, foreign_key: :user_uuid, dependent: :destroy

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

      if user.save
        # 通知設定のテーブル作成
        if user.user_notices.blank?
          # TODO : もうちょっと良い方法がある気がする
          notice_app = Notice.create!
          UserNotice.create!(user_uuid: user.uuid, notice_id: notice_app.id,notice_kind: UserNotice.notice_kinds[:app])
          notice_email = Notice.create!
          UserNotice.create!(user_uuid: user.uuid, notice_id: notice_email.id,notice_kind: UserNotice.notice_kinds[:email])
        end

        user.authentications.create!(provider: auth.provider, uid: auth.uid)
        user
      else
        logger.error "User save failed: #{user.errors.full_messages.join(", ")}"
        nil
      end
    end
  rescue => e
    logger.error e
    nil
  end

  def as_header_json
    {
      uuid: uuid,
      name: name,
      avatar: profile&.avatar&.url,
      header_image: profile&.header_image&.url,
      following_count: following.count || 0,
      follower_count: followers.count || 0,
    }
  end

  def as_custom_json(posts = [])
    {
      uuid: uuid,
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
