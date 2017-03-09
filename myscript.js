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
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });
