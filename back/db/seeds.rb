
# タグ
tags = ['立ち絵', '背景', 'アイコン', '落書き']
tags.each do |tag|
  Tag.find_or_create_by!(name: tag)
end

# シナリオ
sheets = Google::Spreadsheets.new.get_values(ENV['GOOGLE_SPREADSHEET_ID'], 'synalio!A2:C')
sheets.values.each do |row|
  Synalio.find_or_create_by!(name: row[0])
end