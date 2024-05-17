class CreateFavorites < ActiveRecord::Migration[7.1]
  def change
    create_table :favorites do |t|
      t.timestamps
    end
    add_reference :favorites, :user, foreign_key: true
    add_reference :favorites, :post, foreign_key: true
  end
end
