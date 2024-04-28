class CreateAuthentictions < ActiveRecord::Migration[7.1]
  def change
    create_table :authentictions do |t|
      t.string :provider, null: false
      t.string :uid, null: false, default: ""

      t.timestamps
    end
    add_reference :authentictions, :user, foreign_key: true
    add_index :authentictions, [:uid, :provider], unique: true
  end
end
