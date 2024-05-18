class PostSearch
  def initialize(params)
    @params = params
  end

  def search_word
    search_word = @params[:search_word]
    return if search_word.blank?
    posts = Post.includes(:user).where(publish_state: 'all_publish')
    # 先にゲームシステムで検索をかける
    game_system = GameSystem.find_by_name(search_word)
    if game_system.present?
      game_systems = PostGameSystem.where(game_system_id: game_system.id)
      posts.where(id: game_systems.map(&:post_id)).order(published_at: :desc).distinct
    else
      # 全検索
      posts.joins(:tags, :synalios, :user).where("posts.title LIKE :search_word OR tags.name LIKE :search_word OR synalios.name LIKE :search_word OR users.name LIKE :search_word", search_word: "%#{search_word}%").order(published_at: :desc)
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

    posts = Post.includes(:user).where(publish_state: 'all_publish')
    # AND検索
    if search_type == 'AND'
      # ゲームシステムで検索
      if game_system.present?
        game_systems = PostGameSystem.where(game_system_id: game_system.id)
        posts = posts.where(id: game_systems.map(&:post_id))
      end
      posts = and_search(posts, post_title, tag_list, synalio_name, user_name)
      posts.order(published_at: :desc).distinct
    else
      # OR検索
      if game_system.present?
        game_systems = PostGameSystem.where(game_system_id: game_system.id)
        posts = posts.or(Post.where(id: game_systems.map(&:post_id)).distinct)
      end
      or_posts = or_search(posts, post_title, tag_list, synalio_name, user_name)
      posts = or_posts if or_posts
      posts.order(published_at: :desc)
    end

  end

  def and_search(posts, post_title, tag_list, synalio_name, user_name)
    # タイトル検索
    posts = posts.where("posts.title LIKE ?", "%#{post_title}%") if post_title.present?
    # タグ検索
    posts = posts.joins(:tags).where("tags.name IN (?)", tag_list) if tag_list.present?
    # シナリオ検索
    posts = posts.joins(:synalios).where("synalios.name LIKE ?", "%#{synalio_name}%") if synalio_name.present?
    # ユーザー検索
    posts = posts.joins(:user).where("users.name LIKE ?", "%#{user_name}%") if user_name.present?
    posts
  end

  def or_search(posts, post_title, tag_list, synalio_name, user_name)
    or_posts = nil
    # タイトル検索
    if post_title.present?
      title = posts.where("title LIKE ?", "%#{post_title}%")
      or_posts = or_posts ? posts.or(title) : title
    end
    # タグ検索
    if tag_list.present?
      tag = Popostsst.joins(:tags).where(tags: { name: tag_list })
      or_posts = or_posts ? or_posts.or(tag) : tag
    end
    # シナリオ検索
    if synalio_name.present?
      synalio = posts.joins(:synalios).where(synalios: { name: synalio_name })
      or_posts = or_posts ? or_posts.or(synalio) : synalio
    end
    # ユーザー検索
    if user_name.present?
      user = posts.joins(:user).where(users: { name: user_name })
      or_posts = or_posts ? or_posts.or(user) : user
    end

    or_posts
  end
end