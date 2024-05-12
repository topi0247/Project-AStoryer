class IllustSerializer
  include JSONAPI::Serializer
  attributes :image

  def image
    object.image.attached? ? url_for(object.image) : nil
  end
end
