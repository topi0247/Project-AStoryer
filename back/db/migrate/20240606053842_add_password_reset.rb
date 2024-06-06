class AddPasswordReset < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :reset_password_token, :string
    add_column :users, :reset_password_sent_at, :datetime
    add_column :users, :allow_password_change, :boolean, default: false
    add_index :users, :reset_password_token, unique: true
    add_index :users, :reset_password_sent_at, unique: true
    add_index :users, :allow_password_change, unique: true
  end
end
