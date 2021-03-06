$(function(){
  function buildHTML(message){
    var image_url = (message.image_url !==null)? `<img class="lower-message__image" src="${message.image_url}">`:"";
    var html = `
    <div class="message" data-id=${message.id}>
      <div class="upper-message">
        <div class="upper-message__name">
          ${message.user_name}
        </div>
        <div class="upper-message__time">
          ${message.created_at}
        </div>
      </div>
      <div class="bottom-message">
        <p class="bottom-message__comment">
          ${message.content}
        </p>
        ${image_url}
      </div>
    </div>`
    return html;
  }
  setInterval(automaticUpload, 5000)

  function automaticUpload(){
    var last_message_id = $(".message:last").attr("data-id")
    if (last_message_id ==null){
      return false
    }
    var url = $("#new_message").attr("action");
    $.ajax({
      type: "GET",
      url: url,
      data: {
        id: last_message_id
      },
      dataType: 'json'
    })
    .done(function(data){
      for(var i = 0; i<data.length; i++){
        var html = buildHTML(data[i]);
        $(".messages").append(html);
      }
    })
    .fail(function(data){
      alert('error');
    })
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();

    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      $(".form__submit").attr("disabled",false);
      if((data.content==null)&&(data.image_url==null)){
        return false
      }
      var html = buildHTML(data);
      $(".messages").append(html);
      $(".form__message").val("");
      $(".hidden").val("");
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 'fast');
    })
    .fail(function(data){
      alert('error');
      $(".form__submit").attr("disabled",false);
    })
  });
});

