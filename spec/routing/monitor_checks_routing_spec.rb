require "rails_helper"

RSpec.describe MonitorChecksController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/monitor_checks").to route_to("monitor_checks#index")
    end

    it "routes to #new" do
      expect(get: "/monitor_checks/new").to route_to("monitor_checks#new")
    end

    it "routes to #show" do
      expect(get: "/monitor_checks/1").to route_to("monitor_checks#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/monitor_checks/1/edit").to route_to("monitor_checks#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/monitor_checks").to route_to("monitor_checks#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/monitor_checks/1").to route_to("monitor_checks#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/monitor_checks/1").to route_to("monitor_checks#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/monitor_checks/1").to route_to("monitor_checks#destroy", id: "1")
    end
  end
end
