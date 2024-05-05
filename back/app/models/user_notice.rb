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
class UserNotice < ApplicationRecord
  belongs_to :user
  belongs_to :notice
  enum notice_kind: { app: 0, email: 1 }
end
