if Rails.env.production?
  Rails.application.config.session_store :cookie_store, key: '_astoryer_auth_token', expire_after: 2.weeks
else
  Rails.application.config.session_store :cookie_store, key: '_astoryer_auth_token', domain: 'localhost'
end