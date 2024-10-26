class MonitorChecksController < ApplicationController
  before_action :set_monitor_check, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /monitor_checks
  def index
    @monitor_checks = MonitorCheck.all
    render inertia: 'monitor_check/index', props: {
      monitor_checks: @monitor_checks.map do |monitor_check|
        serialize_monitor_check(monitor_check)
      end
    }
  end

  # GET /monitor_checks/1
  def show
    render inertia: 'monitor_check/show', props: {
      monitor_check: serialize_monitor_check(@monitor_check)
    }
  end

  # GET /monitor_checks/new
  def new
    @monitor_check = MonitorCheck.new
    render inertia: 'monitor_check/new', props: {
      monitor_check: serialize_monitor_check(@monitor_check)
    }
  end

  # GET /monitor_checks/1/edit
  def edit
    render inertia: 'monitor_check/edit', props: {
      monitor_check: serialize_monitor_check(@monitor_check)
    }
  end

  # POST /monitor_checks
  def create
    @monitor_check = MonitorCheck.new(monitor_check_params)

    if @monitor_check.save
      redirect_to @monitor_check, notice: "Monitor check was successfully created."
    else
      redirect_to new_monitor_check_url, inertia: { errors: @monitor_check.errors }
    end
  end

  # PATCH/PUT /monitor_checks/1
  def update
    if @monitor_check.update(monitor_check_params)
      redirect_to @monitor_check, notice: "Monitor check was successfully updated."
    else
      redirect_to edit_monitor_check_url(@monitor_check), inertia: { errors: @monitor_check.errors }
    end
  end

  # DELETE /monitor_checks/1
  def destroy
    @monitor_check.destroy!
    redirect_to monitor_checks_url, notice: "Monitor check was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_monitor_check
      @monitor_check = MonitorCheck.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def monitor_check_params
      params.require(:monitor_check).permit(:name, :script, :check_frequency, :failure_count, :last_checked_at)
    end

    def serialize_monitor_check(monitor_check)
      monitor_check.as_json(only: [
        :id, :name, :script, :check_frequency, :failure_count, :last_checked_at
      ])
    end
end
