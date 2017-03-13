$(document).ready(function(){
  //按钮点击事件
  let filter = false,
      paging = false;
  $("#btn1").click(function(){
    filter = !filter;
    if(filter){
      $("#btn1").text("已过滤");
      chrome.extension.sendRequest({type: "filter",text:true}, function(response) {
      });
    }else{
      $("#btn1").text("过滤其他内容");
      chrome.extension.sendRequest({type: "filter",text:false}, function(response) {
      });
    }
  });

  $("#btn2").click(function(){
    paging = !paging;
    if(paging){
      $("#btn2").text("已分页");
      chrome.extension.sendRequest({type: "paging",text:true}, function(response) {
      });
    }else{
      $("#btn2").text("文章自动分页");
      chrome.extension.sendRequest({type: "paging",text:false}, function(response) {
      });
    }
  });

});
