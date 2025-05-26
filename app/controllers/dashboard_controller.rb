class DashboardController < ApplicationController
  inertia_share flash: -> { flash.to_hash }

  # GET /dashboard
  def index
    @data = JSON.parse(Rails.public_path.join("data/dashboard_data.json").read)

    render inertia: "dashboard/index", props: {
      data: serialize_dashboard(@data)
    }
  end

  private

  def serialize_dashboard(data)
    data.as_json
  end
end
