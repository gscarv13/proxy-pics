Rails.application.routes.draw do
  resources :assignees, only: [:index]

  scope :requester do
    get "/orders" => 'requester_orders#index'
    post "/order" => 'requester_orders#create'
    get "/orders/:id" => 'requester_orders#show'
  end

  namespace :api do
    namespace :v1 do
      scope :assignee do
        get "/orders" => 'assignee_orders#index'
        get "/order/:id" => 'assignee_orders#show'
        put "/order/:id" => 'assignee_orders#update'
      end
    end
  end

  scope :authenticate do
    post '/requester' => 'sessions#requester'
    post '/assignee' => 'sessions#assignee'
  end
  
  # This is used to catch all routes but exclude active storage routes
  get '*all', to: 'root#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
  root 'root#index'
end
