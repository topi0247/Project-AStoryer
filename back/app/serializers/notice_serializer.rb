# == Schema Information
#
# Table name: notices
#
#  id         :bigint           not null, primary key
#  favorite   :boolean          default(FALSE), not null
#  bookmark   :boolean          default(FALSE), not null
#  comment    :boolean          default(FALSE), not null
#  follower   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class NoticeSerializer
  include JSONAPI::Serializer

  set_id :id
  attributes :favorite, :bookmark, :comment, :follower
end
