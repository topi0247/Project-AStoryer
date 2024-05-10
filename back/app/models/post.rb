# == Schema Information
#
# Table name: posts
#
#  id            :bigint           not null, primary key
#  content_kind  :integer          default(0)
#  title         :string           not null
#  caption       :string
#  publish_state :integer
#  published_at  :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :bigint
#
class Post < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, length: { maximum: 20 }
  validates :caption, length: { maximum: 10_000 }
  enum publish_state: { draft: 0, all_publish: 1, only_url: 2, only_follower: 3, private_publish:4 }
  enum content_kind: { illust: 0 }
end
