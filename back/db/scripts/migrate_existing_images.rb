# 既存のイラストデータを新しいモデルに移行するスクリプト
Illust.find_each do |illust|
  illust.image.each_with_index do |image, index|
    illust_attachment = illust.illust_attachments.build(position: index + 1)
    illust_attachment.image.attach(image.blob)
    illust_attachment.save!
  end
end