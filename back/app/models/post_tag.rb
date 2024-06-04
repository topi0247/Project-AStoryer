# == Schema Information
#
# Table name: post_tags
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tag_id     :bigint
#  post_uuid  :uuid             not null
#
class PostTag < ApplicationRecord
  belongs_to :post, foreign_key: :post_uuid, primary_key: :uuid
  belongs_to :tag
end
