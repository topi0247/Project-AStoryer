# == Schema Information
#
# Table name: post_tags
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tag_id     :bigint
#  post_id    :bigint
#
class PostTag < ApplicationRecord
  belongs_to :post
  belongs_to :tag
end
