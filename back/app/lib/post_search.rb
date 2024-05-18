class PostSearch
  def initialize(params)
    @params = params
  end

  def search_word
    search_word = @params[:search_word]
    return if search_word.blank?
    # 先にゲームシステムで検索をかける
    game_system = GameSystem.find_by_name(search_word)
    if game_system.present?
      game_systems = PostGameSystem.where(game_system_id: game_system.id)
      posts = Post.includes(:user)
              .where(id: game_systems.map(&:post_id))
              .where(publish_state: 'all_publish').order(published_at: :desc)
      posts
    else
      posts = Post.joins(:user, :tags, :synalios)
            .where(publish_state: 'all_publish')
            .where('posts.title LIKE ? OR tags.name LIKE ? OR synalios.name LIKE ? OR users.name LIKE ?', "%#{search_word}%", "%#{search_word}%", "%#{search_word}%", "%#{search_word}%")
            .order(published_at: :desc)
      posts
    end
  end

  def search_detail
    post_title = @params[:post_title]
    game_system = @params[:game_system].present? ? GameSystem.find_by_name(@params[:game_system]) : nil
    synalio_name = @params[:synalio_name]
    tags = @params[:tags]
    tag_list = tags.split(',') if tags.present?
    user_name = @params[:user_name]
    search_type = @params[:search_type]

    posts = []
    # ゲームシステムで検索
    if game_system.present?
      game_systems = PostGameSystem.where(game_system_id: game_system.id)
      posts = Post.where(id: game_systems.map(&:post_id))
              .where(publish_state: 'all_publish').order(published_at: :desc)
    end

    # AND検索
    if search_type == 'AND'
      return posts if posts.blank?
      # タイトル、タグ、シナリオ名、ユーザー名で検索
      posts = posts.joins(:user, :tags, :synalios)
              .where(publish_state: 'all_publish')
              .where('posts.title LIKE ? AND tags.name LIKE ? AND synalios.name LIKE ? AND users.name LIKE ?', "%#{post_title}%", "%#{tag_list}%", "%#{synalio_name}%", "%#{user_name}%")
      posts
    else
      # OR検索
      posts = Post.joins(:user, :tags, :synalios)
              .where(publish_state: 'all_publish')
              .where('posts.title LIKE ? OR tags.name LIKE ? OR synalios.name LIKE ? OR users.name LIKE ?', "%#{post_title}%", "%#{tag_list}%", "%#{synalio_name}%", "%#{user_name}%").merge(posts)
      posts
    end
  end
end