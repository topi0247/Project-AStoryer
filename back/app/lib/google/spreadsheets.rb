require 'google/apis/sheets_v4'

class Google::Spreadsheets
  def initialize
    @service = Google::Apis::SheetsV4::SheetsService.new
    @service.authorization = authorize
  end

  # 認証
  def authorize
    # 環境変数のprivate_keyは改行コードが\\nになってしまうので\nに修正する
    json_key = JSON.generate(
      private_key: ENV['GOOGLE_PRIVATE_KEY'].gsub("\\n", "\n"),
      client_email: ENV['GOOGLE_CLIENT_EMAIL']
    );

    json_key_io = StringIO.new(json_key)

    authorizer = Google::Auth::ServiceAccountCredentials.make_creds(
      json_key_io: json_key_io,
      scope: ['https://www.googleapis.com/auth/spreadsheets']
    )
    authorizer.fetch_access_token!
    authorizer
  end

  # 指定されたスプシIDと範囲から値を取得
  def get_values(id,range)
    @service.get_spreadsheet_values(id, range)
  end
end