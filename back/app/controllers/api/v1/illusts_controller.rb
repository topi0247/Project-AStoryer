class Api::V1::IllustsController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[index]

  def index
    post_search = PostSearch.new(search_params)
    search_results = []
    if search_params[:search_word].present?
      search_results = post_search.search_word
    else
      search_results = post_search.search_detail
    end

    posts_json = []
    if search_results.present?
      posts_json = search_results.map do |post|
        content = nil
        if post.illust?
          content = url_for(post.postable.image)
        end
        post.as_custom_index_json(content)
      end
    end

    render json: { illusts: posts_json, count: search_results.count }, status: :ok
  end

  private

  def search_params
    params.permit(:search_word, :post_title, :game_system, :synalio_name, :tags, :user_name, :search_type)
  end
end
