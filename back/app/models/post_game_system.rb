class PostGameSystem < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :game_system
  belongs_to :post
end