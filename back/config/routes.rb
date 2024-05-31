Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth',controllers: {
        omniauth_callbacks: 'api/v1/auth/omniauth_callbacks',
        sessions:           'api/v1/auth/sessions',
        registrations:       'api/v1/auth/registrations',
        token_validations:  'api/v1/auth/token_validations'
      }
      resource :account, only: %i[show update]
      resource :notice, only: %i[update]
      resources :posts, only: %i[index show create edit update destroy]
      resources :illusts, only: %i[index]
      resources :tags, only: %i[index create]
      resources :synalios, only: %i[index]
      resources :game_systems, only: %i[index]
      resources :users, only: %i[show] do
        member do
          get 'bookmarks'
          get 'postsIllust'
        end
      end
      resources :favorites, only: %i[show create destroy]
      resources :bookmarks, only: %i[show create destroy]
    end
  end
end
