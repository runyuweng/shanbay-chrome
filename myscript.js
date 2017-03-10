// $('#bannerandheader').hide();
// $('#google_image_div').hide();
// $('.js-components-container').hide();
// $('.content__meta-container.js-content-meta.js-football-meta.u-cf').hide();
// $('.element.element-rich-link.element--thumbnail.element-rich-link--upgraded').hide();
// $('.content__labels.content__labels--not-immersive').hide();
// $('.content__secondary-column.js-secondary-column').hide();
// $('.rich-link').hide();
// $('.content-footer').hide();
// $('.submeta').hide();
// $('footer').hide();
// $('body').click(function(){
//   chrome.extension.sendRequest({greeting: "hello"}, function(response) {
//     console.log(response);
//   });
// })
// chrome.extension.onRequest.addListener(
//   function(request, sender, sendResponse) {
//     console.log('this is myscript,get the message');
//   }
// );

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
      $('.content__article-body.from-content-api.js-article__body').click({
        function(){
          console.log(111);
        }
      })

      sendResponse({message: "paging success"});
    }
  }
);
