# == Schema Information
#
# Table name: post_synalios
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  synalio_id :bigint           not null
#  post_uuid  :uuid             not null
#
class PostSynalio < ApplicationRecord
  belongs_to :post, foreign_key: :post_uuid
  belongs_to :synalio
end
