class Comment < ApplicationRecord
  belongs_to :user, foreign_key: :user_uuid, primary_key: :uuid
  has_many :post_comments, dependent: :destroy
  has_many :posts, foreign_key: :post_uuid, through: :post_comments
  validates :text, presence: true, length: { maximum: 500 }
end
