Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  devise_for :users

  devise_scope :user do
    get '/sign_out', to: "devise/sessions#destroy"
  end

  namespace :api do
    resource :user, only: [:show, :update]
    resources :photos, only: [:index, :create, :destroy]
  end

  root to: 'app#index'
  # catch all routes and send to React Router
  get "*path", to: 'app#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }

end