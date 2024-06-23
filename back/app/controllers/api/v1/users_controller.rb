class Api::V1::UsersController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[show postsIllust bookmarks follower]
  before_action :set_user, only: %i[show postsIllust bookmarks following follower]

  def show
    header_image_url = nil
    avatar_url = nil
    if @user.profile.present?
      if@user.profile.header_image.attached?
        header_image_url = url_for(@user.profile.header_image)
      end
      if @user.profile.avatar.attached?
        avatar_url = url_for(@user.profile.avatar)
      end
    end

    render json: @user.as_custom_json(header_image_url,avatar_url), status: :ok
  end

  def postsIllust
    posts = []
    # ログインユーザーと表示ユーザーが同じ場合は全ての投稿を取得
    if(current_api_v1_user && current_api_v1_user.uuid == @user.uuid)
      posts = @user.posts.publish_at_desc.map do |post|
        content = nil
        if post.illust?
          content = url_for(post.postable.get_first_image)
        end
        {
          uuid: post.short_uuid,
          title: post.title,
          data: content,
          publish_state: post.publish_state,
        }
      end
    else
      # ログインユーザーと表示ユーザーが異なる場合は公開投稿のみ取得
      # TODO : フォロワーの場合はフォロワー公開も取得
      posts = @user.posts.only_publish.publish_at_desc.map do |post|
        content = nil
        if post.illust?
          content = url_for(post.postable.get_first_image)
        end
        {
          uuid: post.short_uuid,
          title: post.title,
          data: content
        }
      end
    end
    render json: posts, status: :ok
  end

  def bookmarks
    # ログインユーザーと表示ユーザーが同じ場合は全てのブックマークを取得
    if(current_api_v1_user && current_api_v1_user.uuid == @user.uuid)
      bookmark_posts = @user.bookmark_posts
    else
      # ログインユーザーと表示ユーザーが異なる場合は公開投稿のみ取得
      # TODO : フォロワーの場合はフォロワー公開も取得
      bookmark_posts = @user.bookmark_posts.only_publish.publish_at_desc
    end

    posts = bookmark_posts.map do |post|
      {
        uuid: post.short_uuid,
        title:post.title,
        data: post.illust? ? url_for(post.postable.get_first_image) : nil,
      }
    end

    render json: posts, status: :ok
  end

  def following
    users = @user.following.map do |user|
      {
        user: {
          uuid: user.short_uuid,
          name: user.name,
          avatar: user.profile&.avatar&.attached? ? url_for(user.profile.avatar) : nil,
          isFollowing: true
        }
      }
    end

    render json: {users: users}, status: :ok
  end

  def follower
    users = @user.followers.map do |user|
      {
        user: {
          uuid: user.short_uuid,
          name: user.name,
          avatar: user.profile&.avatar&.attached? ? url_for(user.profile.avatar) : nil,
          isFollowing: current_api_v1_user&.following?(user)
        }
      }
    end

    render json: {users: users}, status: :ok
  end

  private

  def set_user
    begin
      if params[:id].length != 22
        raise ActiveRecord::RecordInvalid
      end
      @user = User.find_by_short_uuid(user_params[:id])
      if @user.nil?
        raise ActiveRecord::RecordNotFound
      end
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: 'Invalid UUID' }, status: :not_found
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: 'Not Found' }, status: :not_found
    rescue => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  def user_params
    params.permit(:id)
  end
end
