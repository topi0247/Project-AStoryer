class CreateNotices < ActiveRecord::Migration[7.1]
  def change
    create_table :notices do |t|
      t.boolean :favorite, null: false, default: false
      t.boolean :bookmark, null: false, default: false
      t.boolean :comment, null: false, default: false
      t.boolean :follower, null: false, default: false

      t.timestamps
    end
  end
end
