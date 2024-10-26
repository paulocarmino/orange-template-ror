JsRoutes.setup do |config|
  config.exclude = [/rails_/] # excludes rails generated routes
  config.compact = true       # removes the _path from the route name
  config.file = Rails.root.join("app/frontend/src/routes.js")
  JsRoutes.generate!
end
