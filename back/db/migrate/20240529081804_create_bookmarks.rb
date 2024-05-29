class CreateBookmarks < ActiveRecord::Migration[7.1]
  def change
    create_table :bookmarks do |t|
      t.uuid :user_uuid, null: false
      t.uuid :post_uuid, null: false

      t.timestamps
    end

    add_foreign_key :bookmarks, :users, column: :user_uuid, primary_key: :uuid
    add_foreign_key :bookmarks, :posts, column: :post_uuid, primary_key: :uuid
    add_index :bookmarks, %i[user_uuid post_uuid], unique: true
  end
end
