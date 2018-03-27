json.user_name  @message.user.name
json.content    @message.content
json.created_at format_posted_time(@message.created_at)
json.image      @message.image
json.image_url  @message.image.url