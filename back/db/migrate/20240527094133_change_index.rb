class ChangeIndex < ActiveRecord::Migration[7.1]
  def change
    # 既存のindexを削除
    # 認証
    remove_index :authentications, name: 'index_authentications_on_uid_and_provider'
    # いいね
    remove_index :favorites, name: 'index_favorites_on_post_id'
    remove_index :favorites, name: 'index_favorites_on_user_id'
    # ゲームシステムの中間テーブル
    remove_index :post_game_systems, name: 'index_post_game_systems_on_post_id'
    # タグの中間テーブル
    remove_index :post_tags, name: 'index_post_tags_on_post_id'
    # 投稿
    remove_index :posts, name: 'index_posts_on_user_id'
    # プロフィール
    remove_index :profiles, name: 'index_profiles_on_user_id'
    # フォロイー・フォロワーの中間テーブル
    remove_index :relationships, name: 'index_relationships_on_follower_id'
    remove_index :relationships, name: 'index_relationships_on_followed_id'
    # 通知の中間テーブル
    remove_index :user_notices, name: 'index_user_notices_on_user_id'

    # uuidをindexとして追加
    add_index :authentications, :user_uuid
    add_index :favorites, :user_uuid
    add_index :favorites, :post_uuid
    add_index :post_game_systems, :post_uuid
    add_index :post_tags, :post_uuid
    add_index :posts, :user_uuid
    add_index :profiles, :user_uuid
    add_index :relationships, :follower_uuid
    add_index :relationships, :followed_uuid
    add_index :user_notices, :user_uuid
  end
end
