class CreateMonitorChecks < ActiveRecord::Migration[8.0]
  def change
    create_table :monitor_checks do |t|
      t.string :name
      t.text :script
      t.integer :check_frequency
      t.integer :failure_count
      t.datetime :last_checked_at

      t.timestamps
    end
  end
end
