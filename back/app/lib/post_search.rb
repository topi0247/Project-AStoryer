class PostSearch
  def initialize(params)
    @params = params
  end

  def search_word
    search_word = @params[:search_word]
    return if search_word.blank?

    or_posts = or_search(search_word, search_word, search_word, search_word, search_word)
    return or_posts.order(published_at: :desc).distinct if or_posts.exists?
  end

  def search_detail
    post_title = @params[:post_title]
    game_system = @params[:game_system]
    synalio_name = @params[:synalio_name]
    tags = @params[:tags]
    tag_list = tags.split(',') if tags.present?
    user_name = @params[:user_name]
    search_type = @params[:search_type]

    # AND検索
    if search_type == 'AND'
      # ゲームシステムで検索
      posts = and_search(post_title, tag_list, synalio_name, user_name, game_system)
      return posts.order(published_at: :desc) if posts.exists?
    else
      # OR検索
      posts = or_search(post_title, tag_list, synalio_name, user_name, game_system)
      return posts.order(published_at: :desc) if posts.exists?
    end
  end

  def and_search(post_title, tag_list, synalio_name, user_name, game_system)
    posts = Post.includes(:user).only_publish
    # タイトル検索
    posts = posts.search_by_title(post_title) if post_title.present?
    # タグ検索
    posts = posts.search_by_tags(tag_list) if tag_list.present?
    # シナリオ検索
    posts = posts.search_by_synalio(synalio_name) if synalio_name.present?
    # ユーザー検索
    posts = posts.search_by_user(user_name) if user_name.present?
    # ゲームシステム検索
    if game_system.present?
      game_system = GameSystem.find_by_name(game_system)
      if game_system.present?
        game_system_posts = PostGameSystem.where(game_system_id: game_system.id).pluck(:post_uuid)
        posts = posts.where(uuid: game_system_posts)
      end
    end
    posts
  end

  # TODO : うまくできないので一旦保留
  def or_search(post_title, tag_list, synalio_name, user_name, game_system)
    base_posts = Post.only_publish.useful_joins
    or_posts = base_posts.none

    if post_title.present?
      title_posts = base_posts.search_by_title(post_title)
      or_posts = title_posts
    end

    if tag_list.present?
      tag_posts = base_posts.search_by_tags(tag_list)
      or_posts = or_posts.present? ? or_posts.or(tag_posts) : tag_posts
    end

    if synalio_name.present?
      synalio_posts = base_posts.search_by_synalio(synalio_name)
      or_posts = or_posts.present? ? or_posts.or(synalio_posts) : synalio_posts
    end

    if user_name.present?
      user_posts = base_posts.search_by_user(user_name)
      or_posts = or_posts.present? ? or_posts.or(user_posts) : user_posts
    end

    if game_system.present?
      game_system = GameSystem.find_by_name(game_system)
      if game_system.present?
        game_system_posts = PostGameSystem.where(game_system_id: game_system.id).pluck(:post_uuid)
        or_posts = or_posts.present? ? or_posts.or(base_posts.where(uuid: game_system_posts)) : base_posts.where(uuid: game_system_posts)
      end
    end
    or_posts = or_posts if or_posts.present?

    or_posts
  end
end
