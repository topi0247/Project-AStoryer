class NoticeSerializer
  include JSONAPI::Serializer

  set_id :id
  attributes :favorite, :bookmark, :comment, :follower
end
