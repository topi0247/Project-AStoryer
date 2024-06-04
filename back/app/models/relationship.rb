# == Schema Information
#
# Table name: relationships
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  follower_uuid :uuid             not null
#  followed_uuid :uuid             not null
#
class Relationship < ActiveRecord::Base
  belongs_to :follower, class_name: 'User', inverse_of: :following_relationships,foreign_key: :follower_uuid, primary_key: :uuid
  belongs_to :followed, class_name: 'User', inverse_of: :follower_relationships, foreign_key: :followed_uuid, primary_key: :uuid
end
