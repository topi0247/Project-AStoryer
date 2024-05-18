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
      Post.includes(:user)
        .where(id: game_systems.map(&:post_id))
        .where(publish_state: 'all_publish').order(published_at: :desc)
    else
      or_search(search_word, search_word, search_word, search_word)
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

    posts = Post.all

    if search_type == 'AND'
      # ゲームシステムで検索
      if game_system.present?
        game_systems = PostGameSystem.where(game_system_id: game_system.id)
        posts = posts.where(id: game_systems.map(&:post_id))
      end

      # 全体公開のみ
      posts = posts.where(publish_state: 'all_publish')
      # タイトル検索
      posts = posts.where("posts.title LIKE ?", "%#{post_title}%") if post_title.present?
      # タグ検索
      posts = posts.joins(:tags).where("tags.name IN (?)", tag_list) if tag_list.present?
      # シナリオ検索
      posts = posts.joins(:synalios).where("synalios.name LIKE ?", "%#{synalio_name}%") if synalio_name.present?
      # ユーザー検索
      posts = posts.joins(:user).where("users.name LIKE ?", "%#{user_name}%") if user_name.present?

      posts.distinct
    else
      # OR検索
      posts = or_search(post_title, tag_list, synalio_name, user_name)
      if game_system.present?
        game_systems = PostGameSystem.where(game_system_id: game_system.id)
        posts = posts.or(Post.where(id: game_systems.map(&:post_id)).distinct)
      end
    end
    posts.order(published_at: :desc)
  end

  def or_search(post_title, tag_list, synalio_name, user_name)
    posts = Post.where(publish_state: 'all_publish')
    posts = posts.or(Post.where("title LIKE ?", "%#{post_title}%")) if post_title.present?
    posts = posts.joins(:tags).or(Post.where(tags: { name: tag_list })) if tag_list.present?
    posts = posts.joins(:synalios).or(Post.where(synalios: { name: synalio_name })) if synalio_name.present?
    posts = posts.joins(:user).or(Post.where(users: { name: user_name })) if user_name.present?
    posts.distinct
  end
end