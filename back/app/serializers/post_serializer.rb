class PostSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :caption, :publish_state, :postable_type
end