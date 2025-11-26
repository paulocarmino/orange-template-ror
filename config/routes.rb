Rails.application.routes.draw do
  resources :monitor_checks
  resources :articles
  root "dashboard#index"
  get "up" => "rails/health#show", :as => :rails_health_check
  get "manifest" => "rails/pwa#manifest", :as => :pwa_manifest
  get "service-worker" => "rails/pwa#service_worker", :as => :pwa_service_worker

  devise_for :users, skip: [:sessions, :passwords, :registrations]
  as :user do
    get "users/sign_in", to: "users/sessions#new", as: :new_user_session
    post "users/sign_in", to: "users/sessions#create", as: :user_session
    match "users/sign_out", to: "users/sessions#destroy", as: :destroy_user_session, via: Devise.mappings[:user].sign_out_via

    get "users/sign_up", to: "users/registrations#new", as: :new_user_registration
    post "users/sign_up", to: "users/registrations#create", as: :user_registration

    get "users/password/new", to: "users/passwords#new", as: :new_user_password
    get "users/password/edit", to: "users/passwords#edit", as: :edit_user_password
    put "users/password", to: "users/passwords#update", as: :user_password
    post "users/password", to: "users/passwords#create"
  end
end
