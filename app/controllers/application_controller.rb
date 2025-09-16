class ApplicationController < ActionController::Base
  include Auth

  EXCLUDED_TABLES = %w[schema_migrations ar_internal_metadata users]

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :ensure_js_routes_integrity, if: -> { Rails.env.development? }
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

  def ensure_js_routes_integrity
    routes_file = Rails.root.join("app/frontend/src/routes.js")
    return unless routes_file.exist?

    content = File.read(routes_file)

    # Check for core markers that should be present in a valid routes.js file
    required_markers = [
      "export const configure",
      "__jsr.r(",
      "export const root"
    ]

    missing_markers = required_markers.reject { |marker| content.include?(marker) }

    if missing_markers.any?
      Rails.logger.warn "[ApplicationController] routes.js seems invalid (missing: #{missing_markers.join(', ')}). Regenerating..."

      retries = 0
      max_retries = 3

      begin
        JsRoutes.generate!
        Rails.logger.info "[ApplicationController] Successfully regenerated routes.js"
      rescue => e
        retries += 1
        if retries <= max_retries
          Rails.logger.warn "[ApplicationController] Retry #{retries}/#{max_retries} - Error regenerating routes.js: #{e.message}"
          sleep(0.1) # Brief pause before retry
          retry
        else
          Rails.logger.error "[ApplicationController] Failed to regenerate routes.js after #{max_retries} attempts: #{e.message}"
        end
      end
    end
  end
end
