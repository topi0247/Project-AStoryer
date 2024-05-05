class UserNoticeSerializer
  include JSONAPI::Serializer
  attributes :notice_kind

  belongs_to :notice, serializer: NoticeSerializer
end
