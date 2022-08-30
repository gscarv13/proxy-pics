Rails.application.routes.draw do
  scope :api do
    resources :orders, only: [:index, :create, :update, :show]
  scope :authenticate do
    post '/requester' => 'sessions#requester'
    post '/assignee' => 'sessions#assignee'
  end
  
  root 'root#index'
end
