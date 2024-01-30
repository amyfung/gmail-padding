/**
 * Contains code that runs in the background of the extension, including 
 * retrieving the locally stored padding value using the chrome.storage API.
 */

/**
 * Detects whether the extension has been properly installed. Uncomment for
 * testing
 */
/* chrome.runtime.onInstalled.addListener(() => {
    console.log('Gmail Padding Enhancer has been installed.');
  }); */

/**
 * Listens for a message from the content script to retrieve the padding value.
 * Upon receipt of such a message, acts accordingly and sends a response with 
 * the padding value, if it exists, or a default value of 10.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getPadding") {
    chrome.storage.local.get(['paddingValue'], function (result) {
      sendResponse({ paddingValue: result.paddingValue || '10' });
    });
    return true;
  }
});