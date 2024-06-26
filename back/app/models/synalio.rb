# == Schema Information
#
# Table name: synalios
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Synalio < ApplicationRecord
  has_many :post_synalios, dependent: :destroy
  has_many :posts, primary_key: :uuid, foreign_key: :post_uuid, through: :post_synalios
  validates :name, presence: true, uniqueness: true
end
