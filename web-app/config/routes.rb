Rails.application.routes.draw do
  scope :api do
    resources :orders, only: [:index, :create, :update, :show]
  end
  
  root 'root#index'
end
