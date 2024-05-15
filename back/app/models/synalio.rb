class Synalio < ApplicationRecord
  has_many :post_synalios, dependent: :destroy
  validates :name, presence: true, uniqueness: true
end
