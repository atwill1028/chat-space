json.array!(@new_messages) do |new_message|
  json.user_name  new_message.user.name
  json.content    new_message.content
  json.created_at format_posted_time(new_message.created_at)
  json.image      new_message.image
  json.image_url  new_message.image.url
  json.id         new_message.id
end