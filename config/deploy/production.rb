server '54.249.167.42', user: 'ec2-user', roles: %w{app db web}
set :ssh_options, {
  keys: %w(/vagrant/.ssh/atwill_new.pem)
}