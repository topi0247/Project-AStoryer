# == Schema Information
#
# Table name: post_game_systems
#
#  id             :bigint           not null, primary key
#  game_system_id :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  post_uuid      :uuid             not null
#
class PostGameSystem < ApplicationRecord
  belongs_to :post, foreign_key: :post_uuid
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :game_system
end
