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
  has_many :post_synalios, dependent: :destroy
  has_many :synalios, through: :post_synalios, source: :synalio

  validates :title, presence: true, length: { maximum: 20 }
  validates :caption, length: { maximum: 10_000 }
  enum publish_state: { draft: 0, all_publish: 1, only_url: 2, only_follower: 3, private_publish:4 }

  # 公開可能か
  def publishable?(current_user=nil)
    case publish_state
    when 'draft'
      current_user == user
    when 'all_publish'
      true
    when 'only_url'
      true
    when 'only_follower'
      self.user.followers.include?(current_user)
    when 'private_publish'
      current_user == user
    else
      false
    end
  end

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
    post_tags.destroy_all

    # 再登録
    create_tags(new_tags)
  end

  # シナリオの作成
  def create_synalios(new_synalios)
    new_synalios.each do |synalio|
      new_synalio = Synalio.find_or_create_by!(name: synalio)
      post_synalios.build(synalio_id: new_synalio.id)
    end
  end

  # シナリオの更新
  def update_synalios(new_synalios)
    post_synalios.destroy_all
    create_synalios(new_synalios)
  end

  def initialize_postable(type)
    case type
    when 'Illust'
      Illust
    end
  end

  def get_postable
    postable.class.name
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

  # 表示用のカスタムjson
  def as_custom_show_json(content)
    {
      id: id,
      title: title,
      caption: caption,
      synalio: synalios.map(&:name).first,
      tags: tags.map(&:name),
      data: [content],
      user: {
        id: user.id,
        name: user.name,
        profile: user.profile&.text,
        avatar: user.profile&.avatar&.url,
        follower: user.followers.count
      }
    }
  end

  # 編集用のカスタムjson
  def as_custom_edit_json(content)
    {
      id: id,
      title: title,
      caption: caption,
      synalio: synalios.map(&:name).first,
      publish_state: publish_state,
      type: get_postable,
      tags: tags.map(&:name),
      data: [content]
    }
  end
end
