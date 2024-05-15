
# タグ
tags = ['立ち絵', '背景', 'アイコン', '落書き']
tags.each do |tag|
  Tag.find_or_create_by!(name: tag)
end