# == Schema Information
#
# Table name: user_notices
#
#  id          :bigint           not null, primary key
#  notice_kind :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint
#  notice_id   :bigint
#
class UserNoticeSerializer
  include JSONAPI::Serializer
  attributes :notice_kind

  belongs_to :notice, serializer: NoticeSerializer
end
