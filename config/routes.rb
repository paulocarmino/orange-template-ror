Rails.application.routes.draw do
  resources :comments
  resources :posts
  get "inertia-example", to: "inertia_example#index"

  # root "posts#index"
  get "up" => "rails/health#show", :as => :rails_health_check
  get "manifest" => "rails/pwa#manifest", :as => :pwa_manifest
  get "service-worker" => "rails/pwa#service_worker", :as => :pwa_service_worker
end
