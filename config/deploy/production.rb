server '13.115.143.92', user: 'ec2-user', roles: %w{app db web}
set :ssh_options, {
  keys: %w(/vagrant/.ssh/atwill_new.pem)
}
