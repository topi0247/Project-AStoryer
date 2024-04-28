# config/initializers/omniauth.rb
Rails.application.config.middleware.use OmniAuth::Builder do
  OmniAuth.config.allowed_request_methods = [:get]
  provider :google_oauth2, ENV['GOOGLE_KEY'],   ENV['GOOGLE_SECRET'], scope: 'email,profile'
  provider :discord,        ENV['DISCORD_KEY'],  ENV['DISCORD_SECRET'], scope: 'email,identify'
end
