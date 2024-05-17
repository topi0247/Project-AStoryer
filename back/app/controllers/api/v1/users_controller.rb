class Api::V1::UsersController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[show]

  def show
    user = User.find_by(id: params[:id])

    if user.nil?
      render json: { error: 'Not Found' }, status: :not_found and return
    end

    posts = []
    # ログインユーザーと表示ユーザーが同じ場合は全ての投稿を取得
    if(current_api_v1_user && current_api_v1_user.id == user.id)
      posts = user.posts.map do |post|
        {
          id: post.id,
          data: url_for(post.postable.image),
          publish_state: post.publish_state,
        }
      end
    else
      # ログインユーザーと表示ユーザーが異なる場合は公開投稿のみ取得
      # TODO : フォロワーの場合はフォロワー公開も取得
      posts = user.posts.where(publish_state: 'all_publish').map do |post|
        {
          id: post.id,
          data: post.illust? ? url_for(post.postable.image) : nil,
        }
      end
    end

    render json: user.as_custom_json(posts), status: :ok
  end
end
