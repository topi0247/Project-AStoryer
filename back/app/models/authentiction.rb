# == Schema Information
#
# Table name: authentictions
#
#  id         :bigint           not null, primary key
#  provider   :string           not null
#  uid        :string           default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
class Authentiction < ActiveRecord::Base
  belongs_to :user
  validations :provider, :uid, presence: true
end
