Rails.application.routes.draw do
  devise_for :users, skip: [:sessions, :passwords, :registrations]
  as :user do
    get "users/sign_in", to: "users/sessions#new", as: :new_user_session
    post "users/sign_in", to: "users/sessions#create", as: :user_session
    match "users/sign_out", to: "users/sessions#destroy", as: :destroy_user_session, via: Devise.mappings[:user].sign_out_via

    get "users/sign_up", to: "users/registrations#new", as: :new_user_registration
    post "users", to: "users/registrations#create", as: :user_registration
  end
  resources :articles

  root "articles#index"
  get "up" => "rails/health#show", :as => :rails_health_check
  get "manifest" => "rails/pwa#manifest", :as => :pwa_manifest
  get "service-worker" => "rails/pwa#service_worker", :as => :pwa_service_worker
end
