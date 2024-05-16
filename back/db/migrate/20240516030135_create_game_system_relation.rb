class CreateGameSystemRelation < ActiveRecord::Migration[7.1]
  def change
    create_table :post_game_systems do |t|
      t.integer :game_system_id, null: false
      t.references :post, null: false, foreign_key: true
      t.timestamps
    end
  end
end
