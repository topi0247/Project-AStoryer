# == Schema Information
#
# Table name: relationships
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  follower_id :bigint           not null
#  followed_id :bigint           not null
#
class Relationship < ActiveRecord::Base
  belongs_to :follower, class_name: 'User', inverse_of: :following_relationships
  belongs_to :followed, class_name: 'User', inverse_of: :follower_relationships
end
