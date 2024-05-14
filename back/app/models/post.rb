# == Schema Information
#
# Table name: posts
#
#  id            :bigint           not null, primary key
#  title         :string           not null
#  caption       :string
#  publish_state :integer
#  published_at  :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :bigint
#  postable_type :string           not null
#  postable_id   :bigint           not null
#
class Post < ApplicationRecord
  belongs_to :user
  belongs_to :postable, polymorphic: true
  accepts_nested_attributes_for :postable

  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags, source: :tag

  validates :title, presence: true, length: { maximum: 20 }
  validates :caption, length: { maximum: 10_000 }
  enum publish_state: { draft: 0, all_publish: 1, only_url: 2, only_follower: 3, private_publish:4 }

  # タグの作成
  def create_tags(new_tags)
    new_tags.each do |tag|
      new_tag = Tag.find_or_create_by!(name: tag)
      post_tags.build(tag_id: new_tag.id)
    end
  end

  # タグの更新
  def update_tags(new_tags)
    # 登録しているタグを一旦全部消す
    post_tags.destroy_alla

    # 再登録
    create_tags(new_tags)
  end

  def initialize_postable(type)
    case type
    when 'Illust'
      Illust
    end
  end

  # 投稿タイプがイラストか
  def illust?
    postable.is_a?(Illust)
  end

  # 投稿のメインコンテンツの更新可能か
  def main_content_updatable?
    if illust?
      # イラストは未公開時のみ変更可能
      # 公開日時がなければ未公開なので更新可能
      published_at.nil?
    else
      # イラスト以外は更新可能
      true
    end
  end

  # 初公開なら公開日を設定
  def set_published_at(publish_state=nil)
    if publish_state != 'draft' && self.published_at.nil?
      self.published_at = Time.now
    end
  end

  # 編集用のカスタムjson
  def as_custom_edit_json(content)
    post_json = PostSerializer.new(post).serializable_hash
    {
      id: post_json[:data][:id],
      title: post_json[:data][:attributes][:title],
      caption: post_json[:data][:attributes][:caption],
      publish_state: post_json[:data][:attributes][:publish_state],
      type: post_json[:data][:attributes][:type],
      data: [content]
    }
  end
end
