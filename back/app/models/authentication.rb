# == Schema Information
#
# Table name: authentications
#
#  id         :bigint           not null, primary key
#  provider   :string           not null
#  uid        :string           default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_uuid  :uuid             not null
#
class Authentication < ActiveRecord::Base
  belongs_to :user, primary_key: :uuid, foreign_key: :user_uuid
  validates :provider, presence: true
  validates :uid, presence: true

  def self.find_for_oauth(auth)
    find_by(provider: auth.provider, uid: auth.uid)
  end
end
