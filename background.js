
function test(){
  console.log(111);
  console.log($('#resultStats').css());
}
chrome.tabs.onUpdated.addListener(test);
