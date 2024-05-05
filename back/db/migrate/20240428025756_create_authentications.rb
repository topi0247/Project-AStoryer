class CreateAuthentications < ActiveRecord::Migration[7.1]
  def change
    create_table :authentications do |t|
      t.string :provider, null: false
      t.string :uid, null: false, default: ""

      t.timestamps
    end
    add_reference :authentications, :user, foreign_key: true
    add_index :authentications, [:uid, :provider], unique: true
  end
end
