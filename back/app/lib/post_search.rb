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
end