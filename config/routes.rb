Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  devise_for :users

  devise_scope :user do
    get '/sign_out', to: "devise/sessions#destroy"
  end
  
  root to: 'app#index'

  namespace :api do
    resource :user, only: [:show, :update]
    resources :photos, only: [:index, :create, :destroy]
  end

  get '/:path', to: 'app#index'
  get '/:path/:path', to: 'app#index'
  get '/:path/:path/:path', to: 'app#index'
end
