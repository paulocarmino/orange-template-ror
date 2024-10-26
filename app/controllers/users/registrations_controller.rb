class Users::RegistrationsController < Devise::RegistrationsController
  def new
    render inertia: "auth/signup", props: {}
  end

  def create
    super
  end
end
