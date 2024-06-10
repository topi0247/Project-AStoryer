class CreatePostComments < ActiveRecord::Migration[7.1]
  def change
    create_table :post_comments do |t|
      t.uuid :post_uuid, null: false
      t.references :comment, null: false, foreign_key: true
      t.timestamps
    end
    add_foreign_key :post_comments, :posts, column: :post_uuid, primary_key: :uuid
  end
end
