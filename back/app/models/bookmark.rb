# == Schema Information
#
# Table name: bookmarks
#
#  id         :bigint           not null, primary key
#  user_uuid  :uuid             not null
#  post_uuid  :uuid             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Bookmark < ApplicationRecord
  belongs_to :user, primary_key: :uuid, foreign_key: :user_uuid
  belongs_to :post, primary_key: :uuid, foreign_key: :post_uuid
end
