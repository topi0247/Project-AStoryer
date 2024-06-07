class RemoveUniqueIndexFromAllowPasswordChangeOnUsers < ActiveRecord::Migration[7.1]
  def change
    remove_index :users, :allow_password_change
  end
end
