$(document).ready(function(){
  //按钮点击事件
  $("#btn1").click(function(){
    console.log(111);
    chrome.extension.sendRequest({type: "filter",text:"display"}, function(response) {
      console.log(response);
    });
  });

  $("#btn2").click(function(){
    console.log(222);
  });

});
