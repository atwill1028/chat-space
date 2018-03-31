$(function(){
  function buildHTML(message){
    console.log(image_url);
    var html = `
          ${message.user_name}
        </div>
          ${message.created_at}
        </div>
      </div>
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
