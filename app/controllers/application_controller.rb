class ApplicationController < ActionController::Base
  allow_browser versions: :modern

  inertia_share flash: -> { flash.to_hash }
  inertia_share do
    tables = ActiveRecord::Base.connection.tables.reject { |table| %w[schema_migrations ar_internal_metadata].include?(table) }
    models = tables.map { |table| table.camelize }
    {models: models}
  end
end
