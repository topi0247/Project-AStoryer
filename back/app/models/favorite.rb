# == Schema Information
#
# Table name: favorites
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_uuid  :uuid             not null
#  post_uuid  :uuid             not null
#
class Favorite < ApplicationRecord
  belongs_to :user, primary_key: :uuid, foreign_key: :user_uuid
  belongs_to :post, primary_key: :uuid, foreign_key: :post_uuid
end
