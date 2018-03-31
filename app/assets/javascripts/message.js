$(function(){
  function buildHTML(message){
    var image_url = (message.image_url !==null)? `<img class="lower-message__image" src="${message.image_url}">`:"";
    console.log(image_url);
    var html = `
    <div class="message">
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
      var html = buildHTML(data);
      $(".messages").append(html);
      $(".form__message").val("");
      $(".form__message").val("");
      $(".form__submit").attr("disabled",false);
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 'fast');
    })
    .fail(function(data){
      alert('error');
    })
  });
});