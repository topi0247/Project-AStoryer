class AddUuidForeignKey < ActiveRecord::Migration[7.1]
  def change
    # 認証テーブルにuser_uuidを追加
    add_column :authentications, :user_uuid, :uuid
    # いいねテーブルにuser_uuidを追加
    add_column :favorites, :user_uuid, :uuid
    # いいねテーブルにpost_uuidを追加
    add_column :favorites, :post_uuid, :uuid
    # ゲームシステムの中間テーブルにpost_uuidを追加
    add_column :post_game_systems, :post_uuid, :uuid
    # シナリオの中間テーブルにpost_uuidを追加
    add_column :post_synalios, :post_uuid, :uuid
    # タグの中間テーブルにpost_uuidを追加
    add_column :post_tags, :post_uuid, :uuid
    # 投稿テーブルにuser_uuidを追加
    add_column :posts, :user_uuid, :uuid
    # フォロイー・フォロワーの中間テーブルにuser_uuidを追加
    add_column :relationships, :follower_uuid, :uuid
    add_column :relationships, :followed_uuid, :uuid
    # 通知の中間テーブルにuser_uuidを追加
    add_column :user_notices, :user_uuid, :uuid
    # プロフィールにuser_uuidを追加
    add_column :profiles, :user_uuid, :uuid

    # 既存のデータにuuidを設定
    # 認証テーブル
    Authentication.reset_column_information
    Authentication.find_each { |auth| auth.update_column(:user_uuid, User.find(auth.user_id).uuid) }
    # いいねテーブル
    Favorite.reset_column_information
    Favorite.find_each do |fav|
      fav.update_column(:user_uuid, User.find(fav.user_id).uuid)
      fav.update_column(:post_uuid, Post.find(fav.post_id).uuid)
    end
    # ゲームシステムの中間テーブル
    PostGameSystem.reset_column_information
    PostGameSystem.find_each { |pgs| pgs.update_column(:post_uuid, Post.find(pgs.post_id).uuid) }
    # シナリオの中間テーブル
    PostSynalio.reset_column_information
    PostSynalio.find_each { |ps| ps.update_column(:post_uuid, Post.find(ps.post_id).uuid) }
    # タグの中間テーブル
    PostTag.reset_column_information
    PostTag.find_each { |pt| pt.update_column(:post_uuid, Post.find(pt.post_id).uuid) }
    # 投稿テーブル
    Post.reset_column_information
    Post.find_each { |post| post.update_column(:user_uuid, User.find(post.user_id).uuid) }
    # フォロイー・フォロワーの中間テーブル
    Relationship.reset_column_information
    Relationship.find_each do |rel|
      rel.update_column(:follower_uuid, User.find(rel.follower_id).uuid)
      rel.update_column(:followed_uuid, User.find(rel.followed_id).uuid)
    end
    # 通知の中間テーブル
    UserNotice.reset_column_information
    UserNotice.find_each { |un| un.update_column(:user_uuid, User.find(un.user_id).uuid) }
    # プロフィール
    Profile.reset_column_information
    Profile.find_each { |profile| profile.update_column(:user_uuid, User.find(profile.user_id).uuid) }

    # null制約を追加
    change_column_null :authentications, :user_uuid, false
    change_column_null :favorites, :user_uuid, false
    change_column_null :favorites, :post_uuid, false
    change_column_null :post_game_systems, :post_uuid, false
    change_column_null :post_synalios, :post_uuid, false
    change_column_null :post_tags, :post_uuid, false
    change_column_null :posts, :user_uuid, false
    change_column_null :relationships, :follower_uuid, false
    change_column_null :relationships, :followed_uuid, false
    change_column_null :user_notices, :user_uuid, false
    change_column_null :profiles, :user_uuid, false
  end
end
