# == Schema Information
#
# Table name: post_synalios
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :bigint           not null
#  synalio_id :bigint           not null
#
class PostSynalio < ApplicationRecord
  belongs_to :post
  belongs_to :synalio
end
