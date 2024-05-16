# == Schema Information
#
# Table name: post_game_systems
#
#  id             :bigint           not null, primary key
#  game_system_id :integer          not null
#  post_id        :bigint           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class PostGameSystem < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :game_system
  belongs_to :post
end
