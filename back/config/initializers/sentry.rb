Sentry.init do |config|
  config.dsn = ENV['SENTRY_DSN']
  config.breadcrumbs_logger = [:active_support_logger, :http_logger]

  config.traces_sample_rate = 0.2
  config.traces_sampler = lambda do |context|
    true
  end
  config.profiles_sample_rate = 0.2
end