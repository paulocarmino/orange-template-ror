# frozen_string_literal: true

require "inertia_rails/generators/scaffold_template_base"

module Templates
  module InertiaTwTemplates
    module Scaffold
      class ScaffoldGenerator < InertiaRails::Generators::ScaffoldTemplateBase
        hide!
        source_root File.expand_path("../templates", __dir__)
      end
    end
  end
end
