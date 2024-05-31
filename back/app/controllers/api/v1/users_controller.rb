class Api::V1::UsersController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[show bookmarks]
  before_action :set_user, only: %i[show postsIllust bookmarks]

  def show
    render json: @user.as_custom_json, status: :ok
  end

  def postsIllust
    posts = []
    # ログインユーザーと表示ユーザーが同じ場合は全ての投稿を取得
    if(current_api_v1_user && current_api_v1_user.uuid == @user.uuid)
      posts = @user.posts.publish_at_desc.map do |post|
        {
          uuid: post.short_uuid,
          title: post.title,
          data: url_for(post.postable.image),
          publish_state: post.publish_state,
        }
      end
    else
      # ログインユーザーと表示ユーザーが異なる場合は公開投稿のみ取得
      # TODO : フォロワーの場合はフォロワー公開も取得
      posts = @user.posts.only_publish.publish_at_desc.map do |post|
        {
          uuid: post.short_uuid,
          title: post.title,
          data: post.illust? ? url_for(post.postable.image) : nil,
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
        data: post.illust? ? url_for(post.postable.image) : nil,
      }
    end

    render json: posts, status: :ok
  end

  private

  def set_user
    @user = User.find_by_short_uuid(params[:id])
    if @user.nil?
      render json: { error: 'Not Found' }, status: :not_found and return
    end
  end
end
