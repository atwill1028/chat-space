json.array!(@searched_users) do |searched_user|
  json.name searched_user.name
  json.id   searched_user.id
end