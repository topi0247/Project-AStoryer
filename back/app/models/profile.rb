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
#  user_id      :bigint           not null
#
class Profile < ApplicationRecord
  validates :text, length: { maximum: 250 }
end
