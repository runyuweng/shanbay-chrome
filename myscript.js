// 选中翻译
$('body').mouseup(function(e){
  $('.selection-sharing.selection-sharing--active').hide();
  let selected = window.getSelection(),
      range  = selected.getRangeAt(0),
      position = range.getBoundingClientRect();
  //获取tips的left和top
  let left = position.left+document.body.scrollLeft+document.documentElement.scrollLeft,
      top = position.top+document.body.scrollTop+document.documentElement.scrollTop,
      width = position.width,
      height = position.height;
  //上下左右取随机值
  let random = parseInt(Math.random()*4);
  //上下左右
  let pos = [
    'top:'+(top-height-6)+'px;left:'+left+'px',
    'top:'+(top+height)+'px;left:'+left+'px',
    'top:'+top+'px;right:'+(document.body.scrollWidth-left)+'px',
    'top:'+top+'px;left:'+(left+width+2)+'px',
  ];
  //获取到选中内容并发送请求
  if(selected.toString()&&(!$('#tip').text())){
    $('#tip').remove();
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
          let voice = '<img id="voice" style="display:inline-block;vertical-align:middle;min-height:16px;width:16px;height:16px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAiCAYAAAAzrKu4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEY0RDZEN0NENDdGMTFFNkFDNTNDODhBMDQ3QjQxNjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEY0RDZEN0RENDdGMTFFNkFDNTNDODhBMDQ3QjQxNjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RjRENkQ3QUQ0N0YxMUU2QUM1M0M4OEEwNDdCNDE2OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RjRENkQ3QkQ0N0YxMUU2QUM1M0M4OEEwNDdCNDE2OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtzEV+UAAAI0SURBVFjDzZhLKERRGMfHIyXMCIVYTBGllIVHKQvZ2GBlPdnchWKrxJ6sLGVjyQJJGK+8I8xyNiaUVwlFRt6u79T/6BTnzr137j1m8duc73xnfvfOd84953g0TfM4QDoxSZwQDbxd13XbOCGVR+wQOjiKJWZm3HilSiDChE4FuX8VqyWuIRIiCmyIbRHrhNcpsRYiCol5IhPtVsUO0T9IpMQr1kl8YMBRIlWIWRUrJs6R02tXLJkYwCBfRP8ffezUWD0e9IWosCpWSezhR1+JgKSf3eIfEv7SH7Fy4lgY1IgzotHgAeyKseK/RW4dF1swIfRODAtFblrMQqn0IHeci72hIcuBxVYmtkaECb9Bbi7q7Jm9wV+DuSQWRHsEArL8WfRrUSWWIUyeqRhLEeszqEqMUUQ8Ii6bQNWIr6kU82DtY/EJSb4P8XPVYn7ErwzGYMX/pFosRfhyyMa4Z31UixUifmswBlsyoqrF2hFfkeR7+RdGtdgi4l2S/CrEt1WKNSPGaihbkt+BPiOqxPKJS8S6DfLH0CegSiyEdvZXJkly04g74pNNEj4LdIPX64TYPj5JPoPcVuRu8N3Fksm92GqM3UG82x7uoXGxUgsbRfaqm1wQq0HeDQ7PprfWOcSMS1trVnObyOuzcxhJcukwwpeIC2yPEuL4VkY8IKfNiQNvq3DgnYvjwBsWHtCVK4IDm1cE7CS+jDXMtUuVk0S5VBGvoXYFqUiiiPGLu2lcRTlycfcNhrcJLBkhs9QAAAAASUVORK5CYII=" />'
          let tips = '<div id="tip" style="padding:0 8px;background:#000;opacity:0.8;z-index:999;color:#fff;border-radius:5px;position:absolute;'+pos[random]+'">'+voice+data.data.definition+'<div>';
          $('body').append(tips);

          $('#tip').click(function(e){
            e.stopPropagation();
          })
          $('#tip #voice').click(function(){
            chrome.runtime.sendMessage({type: "voice",text:data.data.audio}, function(response) {
            });
          })
        }else{
          hasSelected = true;
          let tips = '<div id="tip" style="padding:0 8px;background:#000;opacity:0.8;z-index:999;color:#fff;border-radius:5px;position:absolute;'+pos[random]+'">未查询到相关单词<div>';
          $('body').append(tips);
        }
      }
    )
  }
})
//点击页面其他位置将弹窗隐藏
$('body').click(function(e){
  e.stopPropagation();
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

      let winHeight = $(window).height()-100,
          totalHeight = $('#article').height();
      $('#article').css('height',winHeight);
      $('#article').css('overflow','hidden');
      let page = (Math.ceil(totalHeight/winHeight)),
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

      $('.pagingList li').click(function(e){
        e.stopPropagation();
        $("[itemprop='publisher']").css('margin-top',-winHeight*(this.innerHTML-1));
        console.log(-(winHeight*(this.innerHTML-1)));
        console.log(this.innerHTML);
      })
      sendResponse({message: "paging success"});
    }else if (request.type === 'paging' && request.text === false){
      $('#article').css('height','auto');
      $('#article').css('overflow','visible');
      $('.pagingList').remove();

    }
  }
);
