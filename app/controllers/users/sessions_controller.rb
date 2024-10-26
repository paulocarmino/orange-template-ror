class Users::SessionsController < Devise::SessionsController
  # GET /login
  def new
    render inertia: "auth/login", props: {}
  end

  # POST /login
  def create
    if (self.resource = warden.authenticate(auth_options))
      flash[:notice] = I18n.t("devise.sessions.signed_in")
      sign_in(resource_name, resource)
      yield resource if block_given?

      head :conflict
      response.set_header("X-Inertia-Location", after_sign_in_path_for(resource))
    else
      keys = Devise.authentication_keys.join(", ")
      flash[:alert] = I18n.t("devise.failure.not_found_in_database", authentication_keys: keys)
      redirect_to new_user_session_path
    end
  end

  # DELETE /logout
  def destroy # rubocop:disable Lint/UselessMethodDefinition
    super
  end
end
