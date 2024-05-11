# == Schema Information
#
# Table name: posts
#
#  id            :bigint           not null, primary key
#  title         :string           not null
#  caption       :string
#  publish_state :integer
#  published_at  :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :bigint
#  postable_type :string           not null
#  postable_id   :bigint           not null
#
class Post < ApplicationRecord
  belongs_to :user
  belongs_to :postable, polymorphic: true
  accepts_nested_attributes_for :postable

  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags, source: :tag
  accepts_nested_attributes_for :tags

  validates :title, presence: true, length: { maximum: 20 }
  validates :caption, length: { maximum: 10_000 }
  enum publish_state: { draft: 0, all_publish: 1, only_url: 2, only_follower: 3, private_publish:4 }

  # 投稿タイプがイラストか
  def illust?
    postable.is_a?(Illust)
  end
end
