chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: request.type , text: request.text}, function(response) {
      });
    });
    sendResponse();
  }
);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type == "voice" && request.text){
      let audio = document.createElement('audio');
      let source = document.createElement('source');
      source.type = "audio/mpeg";
      source.src = request.text;
      source.autoplay = "autoplay";
      source.controls = "controls";
      audio.appendChild(source);
      audio.play();
    }
    sendResponse({farewell: "goodbye"});
  });
