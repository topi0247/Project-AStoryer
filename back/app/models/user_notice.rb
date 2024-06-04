# == Schema Information
#
# Table name: user_notices
#
#  id          :bigint           not null, primary key
#  notice_kind :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  notice_id   :bigint
#  user_uuid   :uuid             not null
#
class UserNotice < ApplicationRecord
  belongs_to :user, foreign_key: :user_uuid, primary_key: :uuid
  belongs_to :notice
  enum notice_kind: { app: 0, email: 1 }
end
