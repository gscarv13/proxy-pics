Rails.application.routes.draw do
  resources :assignees, only: [:index]

  scope :requester do
    get "/orders" => 'requester_orders#index'
    post "/order" => 'requester_orders#create'
    get "/orders/:id" => 'requester_orders#show'
  end

  scope :authenticate do
    post '/requester' => 'sessions#requester'
    post '/assignee' => 'sessions#assignee'
  end
  
  root 'root#index'
end
