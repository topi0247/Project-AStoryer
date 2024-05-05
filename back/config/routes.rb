Rails.application.routes.draw do
  root 'application#index'
  
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth',controllers: {
        omniauth_callbacks: 'api/v1/auth/omniauth_callbacks',
        sessions:           'api/v1/auth/sessions',
        registrations:       'api/v1/auth/registrations'
      }
      resource :account, only: %i[show]
      resource :notice, only: %i[update]
    end
  end
end
