class CreateProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :profiles do |t|
      t.string :avatar
      t.string :header_image
      t.text :text

      t.timestamps
    end
    add_reference :profiles, :user, null: false, foreign_key: true
  end
end
