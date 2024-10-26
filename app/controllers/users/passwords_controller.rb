class Users::PasswordsController < Devise::PasswordsController
  def new
    render inertia: "auth/reset-password", props: {}
  end

  def edit
    self.resource = resource_class.new
    set_minimum_password_length
    resource.reset_password_token = params[:reset_password_token]

    render inertia: "auth/new-password", props: {
      reset_password_token: params[:reset_password_token]
    }
  end

  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      redirect_to after_sending_reset_password_instructions_path_for(resource_name)
    else
      keys = Devise.authentication_keys.join(", ")
      flash[:alert] = I18n.t("devise.failure.not_found_in_database", authentication_keys: keys)
      redirect_to new_user_password_path
    end
  end

  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      if resource_class.sign_in_after_reset_password
        flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
        set_flash_message!(:notice, flash_message)
        resource.after_database_authentication
        sign_in(resource_name, resource)
      else
        set_flash_message!(:notice, :updated_not_active)
      end
      redirect_to after_resetting_password_path_for(resource)
    else
      set_minimum_password_length
      flash[:alert] = resource.errors.full_messages.first
      redirect_to edit_user_password_path({reset_password_token: resource.reset_password_token})
    end
  end
end
