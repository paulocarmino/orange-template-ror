class Users::RegistrationsController < Devise::RegistrationsController
  def new
    render inertia: "auth/signup", props: {}
  end

  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource) # Inertia handles this redirect
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource) # Inertia handles this redirect
      end
    else
      clean_up_passwords resource
      set_minimum_password_length

      error_messages = resource.errors.full_messages.to_sentence
      flash.now[:alert] = error_messages.presence || I18n.t("devise.failure.invalid", authentication_keys: resource_class.authentication_keys.join("/"))

      render inertia: "auth/signup",
        props: {
          errors: resource.errors.to_hash
        }
    end
  end
end
