class CreatePostTags < ActiveRecord::Migration[7.1]
  def change
    create_table :post_tags do |t|

      t.timestamps
    end
    add_reference :post_tags, :tag, foreign_key: true
    add_reference :post_tags, :post, foreign_key: true
  end
end
