# == Schema Information
#
# Table name: posts
#
#  title         :string           not null
#  caption       :string
#  publish_state :integer
#  published_at  :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  postable_type :string           not null
#  postable_id   :bigint           not null
#  uuid          :uuid             not null, primary key
#  user_uuid     :uuid             not null
#
class PostSerializer
  include JSONAPI::Serializer
  attributes :uuid, :title, :caption, :publish_state, :postable_type
end
