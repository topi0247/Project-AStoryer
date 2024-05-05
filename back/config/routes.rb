Rails.application.routes.draw do
  root 'application#index'
  
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth',controllers: {
        omniauth_callbacks: 'api/v1/auth/omniauth_callbacks',
        sessions:           'api/v1/auth/sessions',
        registrations:       'api/v1/auth/registrations'
      }
      resource :user_notice, only: %i[show]
    end
  end
end
