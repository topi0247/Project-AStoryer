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
  has_one :post, as: :postable, primary_key: :uuid, foreign_key: :user_uuid, dependent: :destroy
  has_many :illust_attachments, -> {order(:position)}, dependent: :destroy
  has_many_attached :image

  def active_storage_upload(data_images)
    begin
      data_images.each_with_index do |data_image, index|
        if data_image.start_with?('http')
          # URLからBlobを取得
          blob = ActiveStorage::Blob.find_by(service_url: data_image)
          illust_attachment = IllustAttachment.find_or_initialize_by(image: blob)
          illust_attachment.update!(position: index + 1)
        else
          # 送信されるデータは data: から始まるためエンコードデータのみ抽出
          base64_data = data_image
          if base64_data.start_with?('data:image')
            base64_data = data_image.split(",")[1]
          end
          decoded_image = Base64.decode64(base64_data)
          # MiniMagickでwebpに軽量化
          img = MiniMagick::Image.read(decoded_image)
          img.format 'webp'

          blob = ActiveStorage::Blob.create_and_upload!(
            io: StringIO.new(img.to_blob),
            filename: SecureRandom.uuid,
            content_type: 'image/webp'
            )
          illust_attachments.create!(image: blob, position: index + 1)
        end
      end
      true
    rescue => e
      Rails.logger.error(e)
      false
    end
  end

  def get_first_image
    Rails.logger.debug("illust_attachments:")
    Rails.logger.debug(illust_attachments)
    illust_attachments.first.image
  end
end
