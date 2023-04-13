// on new tab creation when status is complete insert content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(tabId, changeInfo, tab, "tabId, changeInfo, tab");
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    console.log("add content script");

    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["./content.js"],
      })
      .then(() => {
        console.log("INJECTED THE CONTENT SCRIPT.");
      })
      .catch((err) => console.log(err));
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, "message");
  if (message.type === "getProfileInfo") {
    // send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          type: "collectInfo",
          context: "background",
        },
        (response) => {
          console.log(response, "response");
          if (response.success) {
            console.log(response.payload, "payload in background");
            sendResponse({
              success: true,
              payload: response.payload,
            });
          } else {
            sendResponse({
              success: false,
              payload: null,
            });
          }
        }
      );
    });
    return true;
  }
});
