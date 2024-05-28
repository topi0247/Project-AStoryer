class AddUuid < ActiveRecord::Migration[7.1]
  def change
    # uuid拡張機能の有効化
    enable_extension 'pgcrypto'

    # uuidカラムの追加
    add_column :users, :uuid, :uuid, default: 'gen_random_uuid()', null: false
    add_column :posts, :uuid, :uuid, default: 'gen_random_uuid()', null: false

    # uuidの一意制約
    add_index :users, :uuid, unique: true
    add_index :posts, :uuid, unique: true

    # 既存データのuuidカラムにデータ追加
    User.reset_column_information # モデルの操作を行うのでキャッシュを削除
    Post.reset_column_information
    User.find_each { |user| user.update_column(:uuid, SecureRandom.uuid) }
    Post.find_each { |post| post.update_column(:uuid, SecureRandom.uuid) }
  end
end
