class ChangePrimaryKey < ActiveRecord::Migration[7.1]
  def change
    # 外部キー制約を一旦解除
    remove_foreign_key :authentications, :users
    remove_foreign_key :favorites, :users
    remove_foreign_key :favorites, :posts
    remove_foreign_key :post_game_systems, :posts
    remove_foreign_key :post_synalios, :posts
    remove_foreign_key :post_tags, :posts
    remove_foreign_key :posts, :users
    remove_foreign_key :relationships, column: :follower_id
    remove_foreign_key :relationships, column: :followed_id
    remove_foreign_key :user_notices, :users
    remove_foreign_key :profiles, :users

    # プライマリキーをuuidに変更
    # ユーザーテーブルのuuidをプライマリーキーに設定
    execute 'ALTER TABLE users DROP CONSTRAINT users_pkey;'
    execute 'ALTER TABLE users ADD PRIMARY KEY (uuid);'
    # 投稿テーブルのuuidをプライマリーキーに設定
    execute 'ALTER TABLE posts DROP CONSTRAINT posts_pkey;'
    execute 'ALTER TABLE posts ADD PRIMARY KEY (uuid);'

    # 外部キー制約を再設定
    add_foreign_key :authentications, :users, column: :user_uuid, primary_key: :uuid
    add_foreign_key :favorites, :users, column: :user_uuid, primary_key: :uuid
    add_foreign_key :favorites, :posts, column: :post_uuid, primary_key: :uuid
    add_foreign_key :post_game_systems, :posts, column: :post_uuid, primary_key: :uuid
    add_foreign_key :post_synalios, :posts, column: :post_uuid, primary_key: :uuid
    add_foreign_key :post_tags, :posts, column: :post_uuid, primary_key: :uuid
    add_foreign_key :posts, :users, column: :user_uuid, primary_key: :uuid
    add_foreign_key :relationships, :users, column: :follower_uuid, primary_key: :uuid
    add_foreign_key :relationships, :users, column: :followed_uuid, primary_key: :uuid
    add_foreign_key :user_notices, :users, column: :user_uuid, primary_key: :uuid
    add_foreign_key :profiles, :users, column: :user_uuid, primary_key: :uuid
  end
end
