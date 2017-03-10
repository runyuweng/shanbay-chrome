// 选中翻译
$('body').mouseup(function(){
  var selObj = window.getSelection();
  console.log(selObj.toString());
  console.log(selObj);
  if(selObj.toString()){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    myHeaders.append("Authorization", "Bearer TOKEN");
    fetch("https://api.shanbay.com/bdc/search/?word="+selObj.toString(),
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
        console.log(data);
      }
    )
  }
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
      $('.element.element-rich-link.element--thumbnail.element-rich-link--upgraded').hide();
      $('.content__labels.content__labels--not-immersive').hide();
      $('.content__secondary-column.js-secondary-column').hide();
      $('.rich-link').hide();
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
      $('.element.element-rich-link.element--thumbnail.element-rich-link--upgraded').show();
      $('.content__labels.content__labels--not-immersive').show();
      $('.content__secondary-column.js-secondary-column').show();
      $('.rich-link').show();
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
