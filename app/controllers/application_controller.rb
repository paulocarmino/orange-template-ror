class ApplicationController < ActionController::Base
  include Auth

  EXCLUDED_TABLES = %w[schema_migrations ar_internal_metadata users]

  before_action :configure_permitted_parameters, if: :devise_controller?
  allow_browser versions: :modern

  inertia_share flash: -> { flash.to_hash }
  inertia_share do
    tables = ActiveRecord::Base.connection.tables.reject { |table| EXCLUDED_TABLES.include?(table) }
    models = tables.map { |table| table.camelize }
    {models: models}
  end
  inertia_share auth: -> {
    if user_signed_in?
      {
        user: current_user
      }
    end
  }

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[full_name])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[full_name])
  end
end
