// 选中翻译
$('body').mouseup(function(e){
  $('.selection-sharing.selection-sharing--active').hide();
  var selected = window.getSelection();
  console.log('focusNode',selected.focusNode);
  console.log('focusNode',selected.focusNode);
  let range = document.createRange();
  let newNode = document.createElement("div");
  newNode.appendChild(document.createTextNode("New Node Inserted Here"));
  range.insertNode(newNode);
  selected.addRange(range);
  let current_x = e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
      current_y = e.clientY+document.body.scrollTop+document.documentElement.scrollTop;
  //上下左右
  let pos = [
    'top:'+current_y+'px;left:'+current_x+'px',
    'top:'+current_y+'px;left:'+current_x+'px',
    'top:'+current_y+'px;left:'+current_x+'px',
    'top:'+current_y+'px;left:'+current_x+'px',
  ];
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
$('body').click(function(e){
  $('#tip').remove();
})

  // 监听popup点击事件
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
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
      console.log(request.text);
      sendResponse({type: "success"});
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
      console.log(request.text);
      sendResponse({message: "filter success"});
    }else if (request.type === 'paging' && request.text === true){
      //添加分页
      let num = [1,2,3,4],
          pagingList,
          pagingUl;

      pagingList = String(num.map(function(value){
        return '<li key='+value+' style="float:left;text-decoration:none;margin:10px;curosr:pointer;">'+value+'</li>'
      })).replace(/,/g,'');
      pagingUl = '<div class="pagingList" style="display:flex;justify-content:center;align-items:center;"><ul>'+pagingList+'</ul></div>';

      console.log(String(pagingList).replace(/,/g,''));
      $('.content__article-body.from-content-api.js-article__body').append(pagingUl);

      sendResponse({message: "paging success"});
    }
  }
);
