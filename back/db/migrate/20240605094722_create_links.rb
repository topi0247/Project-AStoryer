class CreateLinks < ActiveRecord::Migration[7.1]
  def change
    create_table :links do |t|
      t.uuid :user_uuid, null: false
      t.integer :link_kind, null: false
      t.string :content, null: false
      t.timestamps
    end
    add_foreign_key :links, :users, column: :user_uuid, primary_key: :uuid
    add_index :links, %i[user_uuid link_kind content], unique: true
  end
end
