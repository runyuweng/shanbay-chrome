chrome.tabs.onCreated.addListener(function(tab) {
  console.log('tabs.onCreated --'
              + ' tab.window: ' + tab.windowId
              + ' tab.id: '    + tab.id
              + ' tab.index: '  + tab.index
              + ' tab.url: '    + tab.url);
});
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
        console.log(response.farewell);
      });
    });

    console.log('this is background,get the message')
    sendResponse();
  }
);
