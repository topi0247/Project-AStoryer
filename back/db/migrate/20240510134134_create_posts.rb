class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.integer :content_kind, default: 0
      t.string :title, null: false
      t.string :caption
      t.integer :publish_state
      t.datetime :published_at

      t.timestamps
    end

    add_reference :posts, :user, foreign_key: true
  end
end
