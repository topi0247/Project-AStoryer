class CreateIllustAttachments < ActiveRecord::Migration[7.1]
  def change
    create_table :illust_attachments do |t|
      t.references :illust, null: false, foreign_key: true
      t.integer :position, null: false, default: 0
      t.timestamps
    end
  end
end
