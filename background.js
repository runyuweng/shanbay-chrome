chrome.tabs.onCreated.addListener(function(tab) {
  console.log('tabs.onCreated --'
              + ' tab.window: ' + tab.windowId
              + ' tab.id: '    + tab.id
              + ' tab.index: '  + tab.index
              + ' tab.url: '    + tab.url);
});
