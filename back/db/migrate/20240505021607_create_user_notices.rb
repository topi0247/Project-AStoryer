class CreateUserNotices < ActiveRecord::Migration[7.1]
  def change
    create_table :user_notices do |t|
      t.integer :notice_kind, null: false

      t.timestamps
    end
    add_reference :user_notices, :user, foreign_key: true
    add_reference :user_notices, :notice, foreign_key: true
  end
end
