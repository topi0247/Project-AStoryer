class CreateIllusts < ActiveRecord::Migration[7.1]
  def change
    create_table :illusts do |t|
      t.string :image

      t.timestamps
    end
  end
end
