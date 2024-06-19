class PostComment < ApplicationRecord
  belongs_to :post, foreign_key: :post_uuid, primary_key: :uuid
  belongs_to :comment
end
