class Bookmark < ApplicationRecord
  belongs_to :user, primary_key: :uuid, foreign_key: :user_uuid
  belongs_to :post, primary_key: :uuid, foreign_key: :post_uuid
end
