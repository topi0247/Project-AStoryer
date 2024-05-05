# == Schema Information
#
# Table name: notices
#
#  id         :bigint           not null, primary key
#  favorite   :boolean          default(FALSE), not null
#  bookmark   :boolean          default(FALSE), not null
#  comment    :boolean          default(FALSE), not null
#  follower   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Notice < ApplicationRecord
  has_many :user_notices, dependent: :destroy
  validates :favorite, inclusion: { in: [true, false] }
  validates :bookmark, inclusion: { in: [true, false] }
  validates :comment, inclusion: { in: [true, false] }
  validates :follower, inclusion: { in: [true, false] }
end
