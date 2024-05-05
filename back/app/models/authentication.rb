# == Schema Information
#
# Table name: authentictions
#
#  id         :bigint           not null, primary key
#  provider   :string           not null
#  uid        :string           default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
class Authentication < ActiveRecord::Base
  belongs_to :user
  validates :provider, presence: true
  validates :uid, presence: true

  def self.find_for_oauth(auth)
    find_by(provider: auth.provider, uid: auth.uid)
  end
end
