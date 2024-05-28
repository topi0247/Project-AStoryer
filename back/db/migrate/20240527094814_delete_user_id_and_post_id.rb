class DeleteUserIdAndPostId < ActiveRecord::Migration[7.1]
  def change
    # user_idとpost_idを削除
    # 認証
    remove_column :authentications, :user_id, :bigint
    # いいね
    remove_column :favorites, :user_id, :bigint
    remove_column :favorites, :post_id, :bigint
    # ゲームシステムの中間テーブル
    remove_column :post_game_systems, :post_id, :bigint
    # シナリオの中間テーブル
    remove_column :post_synalios, :post_id, :bigint
    # タグの中間テーブル
    remove_column :post_tags, :post_id, :bigint
    # 投稿
    remove_column :posts, :user_id, :bigint
    # プロフィール
    remove_column :profiles, :user_id, :bigint
    # フォロイー・フォロワーの中間テーブル
    remove_column :relationships, :follower_id, :bigint
    remove_column :relationships, :followed_id, :bigint
    # 通知の中間テーブル
    remove_column :user_notices, :user_id, :bigint

    # userのidとpostのidを削除
    remove_column :users, :id, :bigint
    remove_column :posts, :id, :bigint
  end
end
