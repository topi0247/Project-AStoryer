require 'mini_magick'

class Api::V1::PostsController < Api::V1::BasesController
  skip_before_action :authenticate_api_v1_user!, only: %i[show]
  before_action :set_post, only: %i[update destroy]

  def show
    post = Post.includes(:postable, :tags, :synalios, :user).find_by(id: params[:id])

    if post.nil? || !post.publishable?(current_api_v1_user)
      render json: { error: 'Not Found' }, status: :not_found and return
    end

    content = nil
    if post.illust?
      content = post.postable.image.attached? ? url_for(post.postable.image) : nil
    end

    render json: post.as_custom_show_json(content), status: :ok
  end

  def create
    default_params = post_params.except(:postable_attributes, :tags, :synalios, :game_systems)
    post = current_api_v1_user.posts.build(default_params)
    post.create_tags(post_params[:tags])
    post.create_synalios(post_params[:synalios])
    post.create_game_systems(post_params[:game_systems])

    # 下書き以外は投稿日時保存
    if !post.draft?
      post.published_at = Time.now
    end

    # 投稿タイプに応じたクラス
    postable_type = post.initialize_postable(post_params[:postable_type])
    # 投稿タイプのクラスをインスタンス
    post.postable = postable_type.new

    begin
      # イラストの場合
      if post.illust?
        image = post_params[:postable_attributes].first
        post.postable.active_storage_upload(image)
      end

      # 保存
      post.save!

      render json: { id: post.id }, status: :created
    rescue
      render json: { error: e.message }, status: :bad_request
    end
  end

  def edit
    post = current_api_v1_user.posts.includes(:postable, :tags, :synalios,:game_systems).find_by(id: params[:id])

    if post.nil?
      render json: { error: 'Not Found' }, status: :not_found and return
    end

    content = nil
    if post.illust?
      content = post.postable.image.attached? ? url_for(post.postable.image) : nil
    end

    render json: post.as_custom_edit_json(content), status: :ok
  end

  def update
    begin
      # 投稿データのメインコンテンツの更新が可能か
      if @post.main_content_updatable?
        # イラスト
        if @post.illust?
          # 送られてきた画像の1つだけ
          # TODO : 複数画像は後に実装
          image = post_params[:postable_attributes].first
          # 画像データがURLでない場合は新規登録
          if url_for(@post.postable.image) != image
            @post.postable.active_storage_upload(image)
          end
        end
      end

      # 公開設定で初公開のときは公開日時を設定
      @post.set_published_at(post_params[:publish_state])

      # タグの更新
      @post.update_tags(post_params[:tags])

      # シナリオ名の更新
      @post.update_synalios(post_params[:synalios])

      # システムの更新
      @post.update_game_systems(post_params[:game_systems])

      @post.update!(post_params.except(:postable_attributes, :tags, :synalios, :game_systems))

      render json: { id: @post.id }, status: :ok
    rescue
      render json: { error: e.message }, status: :bad_request
    end
  end

  def destroy
    begin
      @post.destroy!
      render json: { title: @post.title }, status: :ok
    rescue
      render json: { error: 'Not Found' }, status: :not_found
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :caption, :publish_state, :postable_type,postable_attributes: [], tags: [], synalios: [], game_systems: [])
  end

  def set_post
    @post = current_api_v1_user.posts.find(params[:id])
  end
end
