class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.text :text, null: false, default: '', limit: 500
      t.uuid :user_uuid, null: false
      t.timestamps
    end
    add_foreign_key :comments, :users, column: :user_uuid, primary_key: :uuid
  end
end
