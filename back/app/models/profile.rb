# == Schema Information
#
# Table name: profiles
#
#  id           :bigint           not null, primary key
#  avatar       :string
#  header_image :string
#  text         :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_uuid    :uuid             not null
#
class Profile < ApplicationRecord
  belongs_to :user, foreign_key: :user_uuid, primary_key: :uuid
  validates :text, length: { maximum: 250 }
end
