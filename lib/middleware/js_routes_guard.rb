class JsRoutesGuard
  def initialize(app)
    @app = app
  end

  def call(env)
    ensure_js_routes_integrity if Rails.env.development?
    @app.call(env)
  end

  private

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
      Rails.logger.warn "[JsRoutesGuard] routes.js seems invalid (missing: #{missing_markers.join(', ')}). Regenerating..."
      regenerate_js_routes
    end
  end

  def regenerate_js_routes
    retries = 0
    max_retries = 3

    begin
      JsRoutes.generate!
      Rails.logger.info "[JsRoutesGuard] Successfully regenerated routes.js"
    rescue => e
      retries += 1
      if retries <= max_retries
        Rails.logger.warn "[JsRoutesGuard] Retry #{retries}/#{max_retries} - Error regenerating routes.js: #{e.message}"
        sleep(0.1) # Brief pause before retry
        retry
      else
        Rails.logger.error "[JsRoutesGuard] Failed to regenerate routes.js after #{max_retries} attempts: #{e.message}"
      end
    end
  end
end