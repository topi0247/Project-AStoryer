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
class PostSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :caption, :publish_state, :postable_type
end
