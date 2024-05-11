# == Schema Information
#
# Table name: illusts
#
#  id         :bigint           not null, primary key
#  image      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Illust < ApplicationRecord
  has_one :post, as: :postable, dependent: :destroy
  has_one_attached :image

  def active_storage_upload!(image)
    data = image
    # 送信されるデータは data: から始まるためエンコードデータのみ抽出
    base64_data = data.split(",")[1]
    decoded_image = Base64.decode64(base64_data)
    # MiniMagickでwebpに軽量化
    image = MiniMagick::Image.read(decoded_image)
    image.format 'webp'

    ActiveStorage::Blob.create_and_upload!(
      io: StringIO.new(image.to_blob),
      filename: SecureRandom.uuid,
      content_type: 'image/webp'
    )
  end
end
