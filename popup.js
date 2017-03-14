$(document).ready(function(){
  //按钮点击事件
  let filter = false,
      paging = false,
      translate = false;
  $("#filter").click(function(){
    filter = !filter;
    if(filter){
      $("#filter span").text("内容已过滤");
      chrome.extension.sendRequest({type: "filter",text:true}, function(response) {
      });
    }else{
      $("#filter span").text("过滤其他内容");
      chrome.extension.sendRequest({type: "filter",text:false}, function(response) {
      });
    }
  });

  $("#page").click(function(){
    paging = !paging;
    if(paging){
      $("#page span").text("文字已分页");
      chrome.extension.sendRequest({type: "paging",text:true}, function(response) {
      });
    }else{
      $("#page span").text("文章自动分页");
      chrome.extension.sendRequest({type: "paging",text:false}, function(response) {
      });
    }
  });

  $("#translate").click(function(){
    translate = !translate;
    if(translate){
      $("#translate span").text("翻译已开启");
      chrome.extension.sendRequest({type: "translate",text:true}, function(response) {
      });
    }else{
      $("#translate span").text("单词选中翻译");
      chrome.extension.sendRequest({type: "translate",text:false}, function(response) {
      });
    }
  });

});
