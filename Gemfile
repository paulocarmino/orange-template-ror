source "https://rubygems.org"
ruby "3.3.0"

group :development, :test do
  gem "debug", platforms: %i[mri windows], require: "debug/prelude"
  gem "brakeman", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-rspec", require: false
  gem "standard", require: false
  gem "rspec-rails", "~> 7.0.0"
  gem "better_errors"
  gem "binding_of_caller"
end

group :development do
  gem "web-console"
end

gem "rails", ">= 8.0.0.rc1"
gem "propshaft", "~> 1.1"
gem "sqlite3", "~> 2.1"
gem "puma", ">= 5.0"
gem "tzinfo-data", platforms: %i[windows jruby]
gem "solid_cache"
gem "solid_queue"
gem "solid_cable"
gem "bootsnap", require: false
gem "kamal", require: false
gem "thruster", require: false
gem "devise", "~> 4.9"
gem "inertia_rails-contrib", "~> 0.3.0"
gem "vite_rails", "~> 3.0"
gem "js-routes", "~> 2.2"
gem "rack-cors"
