class CreateFollows < ActiveRecord::Migration[7.1]
  def change
    create_table :relationships do |t|
      t.timestamps
    end
    add_reference :relationships, :follower, null: false, foreign_key: { to_table: :users }
    add_reference :relationships, :followed, null: false, foreign_key: { to_table: :users }
  end
end
