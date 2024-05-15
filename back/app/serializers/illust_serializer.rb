# == Schema Information
#
# Table name: illusts
#
#  id         :bigint           not null, primary key
#  image      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class IllustSerializer
  include JSONAPI::Serializer
  attributes :image

  def image
    object.image.attached? ? url_for(object.image) : nil
  end
end
