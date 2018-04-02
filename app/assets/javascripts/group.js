$(function(){
  function buildHTML(data){
    var html = 
    `<div class="chat-group-user clearfix">
       <p class="chat-group-user__name">${data.name}</p>
       <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${data.id} data-user-name=${data.name}>追加</a>
     </div>`
    return html
  }

  function appendUser(user_id,user_name){
    var html =
    `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
       <input name='group[user_ids][]' type='hidden' value=${user_id}>
       <p class='chat-group-user__name'>${user_name}</p>
       <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
     </div>`
    return html
  }
  $(document).on("click", '.user-search-add', function(){
    var user_id = $(this).attr("data-user-id");
    var user_name = $(this).attr("data-user-name");
    $(this).parent().remove();
    $("#js-add-user").append(appendUser(user_id, user_name));
  })
  $(document).on("click", '.user-search-remove', function(){
    $(this).parent().remove();
  })
  $('#user-search-field').keyup(function(){
    var Data = $(this).val();
    if(Data == ""){
      $("#user-search-result").empty();
    }else{
      $.ajax({
        type: "GET",
        url: "/users",
        data: {
          searched_name: Data
        },
        dataType: 'json'
      })
      .done(function(data){
        $("#user-search-result").empty();
        for(var i = 0; i<data.length; i++){
          var html = buildHTML(data[i]);
          $("#user-search-result").append(html);
        }
      })
      .fail(function(data){
        alert('ユーザー検索に失敗しました');
      })
    }
  })
})