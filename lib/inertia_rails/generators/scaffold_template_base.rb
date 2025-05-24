# frozen_string_literal: true

require "rails/generators/resource_helpers"
require_relative "controller_template_base"

module InertiaRails
  module Generators
    class ScaffoldTemplateBase < ControllerTemplateBase
      include Rails::Generators::ResourceHelpers

      remove_argument :actions

      argument :attributes, type: :array, default: [], banner: "field:type field:type"

      def copy_view_files
        available_views.each do |view|
          filename = "#{view}.#{extension}"
          template "#{options.frontend_framework}/#{filename}", File.join(base_path, filename)
        end

        template "#{options.frontend_framework}/#{partial_name}.#{extension}", File.join(base_path, "#{inertia_component_name.downcase}.#{extension}")
      end

      private

      def available_views
        %w[index edit show new form]
      end

      def partial_name
        "one"
      end
    end
  end
end
