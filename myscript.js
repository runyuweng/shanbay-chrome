// 选中翻译
$('body').mouseup(function(e){
  $('.selection-sharing.selection-sharing--active').hide();
  var selected = window.getSelection();
  let current_x = e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
      current_y = e.clientY+document.body.scrollTop+document.documentElement.scrollTop;
  //上下左右
  let pos = [
    'top:'+current_y+'px;left:'+current_x+'px',
    'top:'+current_y+'px;left:'+current_x+'px',
    'top:'+current_y+'px;left:'+current_x+'px',
    'top:'+current_y+'px;left:'+current_x+'px',
  ];
  //获取到选中内容并发送请求
  if(selected.toString()){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    myHeaders.append("Authorization", "Bearer TOKEN");
    fetch("https://api.shanbay.com/bdc/search/?word="+selected.toString(),
      {
        method: "GET"
      },
      myHeaders
    ).then(
      function(res){
        return res.json();
      }
    ).then(
      function(data){
        if(data.msg == "SUCCESS"){
          console.log('success');
          let tips = '<div id="tip" style="padding:0 8px;background:#000;opacity:0.8;z-index:999;color:#fff;border-radius:5px;position:absolute;'+pos[0]+'">'+data.data.definition+'<div>';
          console.log(tips);
          $('body').append(tips);
        }else{
          let tips = '<div id="tip" style="padding:0 8px;background:#000;opacity:0.8;z-index:999;color:#fff;border-radius:5px;position:absolute;'+pos[0]+'">未查询到相关单词<div>';
          $('body').append(tips);

        }
      }
    )
  }
})
//点击页面其他位置将弹窗隐藏
$('body').click(function(e){
  $('#tip').remove();
})







  // 监听popup点击事件
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    //如果接收到打开过滤及执行以下操作
    if(request.type === 'filter' && request.text === true){
      $('#bannerandheader').hide();
      $('#google_image_div').hide();
      $('.js-components-container').hide();
      $('.content__meta-container.js-content-meta.js-football-meta.u-cf').hide();
      $('.content__labels.content__labels--not-immersive').hide();
      $('.content__secondary-column.js-secondary-column').hide();
      $("[data-component='rich-link']").hide();
      $("[data-component='rich-link-tag']").hide();
      $("[data-name^='inline']").hide();
      $('.content-footer').hide();
      $('.submeta').hide();
      $('footer').hide();
      sendResponse({type: "success"});
      //如果接收到关闭过滤执行接下来的操作
    }else if(request.type === 'filter' && request.text === false){
      $('#bannerandheader').show();
      $('#google_image_div').show();
      $('.js-components-container').show();
      $('.content__meta-container.js-content-meta.js-football-meta.u-cf').show();
      $('.content__labels.content__labels--not-immersive').show();
      $('.content__secondary-column.js-secondary-column').show();
      $('.content-footer').show();
      $('.submeta').show();
      $('footer').show();
      sendResponse({message: "filter success"});
      //添加分页
    }else if (request.type === 'paging' && request.text === true){
      //分几页
      $('#article').css('height',($(window).height()-60));
      $('#article').css('overflow','hidden');
      let page = (Math.ceil($(document).height()/($(window).height()-60))),
          num = [],
          pagingList,
          pagingUl;
      for(let i=0;i<page;i++){
        num.push(i+1);
      }
      pagingList = String(num.map(function(value){
        return '<li key='+value+' style="border:1px solid #333;color:#333;border-radius:5px;padding:5px 10px;float:left;margin:10px;cursor:pointer;">'+value+'</li>'
      })).replace(/,/g,'');
      pagingUl = '<div class="pagingList" style="display:flex;justify-content:center;align-items:center;"><ul style="list-style-type:none;margin:0;">'+pagingList+'</ul></div>';
      //为pagingList添加点击事件
      $('.l-side-margins').append(pagingUl);

      $('.pagingList li').click(function(){
        console.log(this.attr('key'));
      })
      sendResponse({message: "paging success"});
    }
  }
);
