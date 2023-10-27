// Listen from incoming messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{

  // received the "start" message. Now send a message to the content scripts
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    const ct = tabs[0]

    // send a message to content script to start reading from the database
    chrome.tabs.sendMessage(ct.id, {"message": "start"}, function(resp){
      console.log("in background script ... got response")
      console.log(resp)
      sendResponse(resp)
    })
  })

  return true
});
