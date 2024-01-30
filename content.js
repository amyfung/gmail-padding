/**
 * Adds padding to email cards and listens for messages with updated padding
 * values from the popup.
 */

/**
 * Applies the given padding value to the email cards.
 * @param {String} paddingValue - The padding value to be applied to the 
 * email cards. Defaults to '10' if not specified.
 * @returns 
 */
function addPaddingToEmailCards(paddingValue) { 
  const cards = document.querySelectorAll('tr.zA.yO, tr.zA.zE, tr.xS');
  if (!cards.length) {
    console.log("No email cards found. Retrying...");
    setTimeout(() => addPaddingToEmailCards(paddingValue), 1000);
    return;
  }
  cards.forEach(card => {
    card.style.paddingTop = `${paddingValue}px`;
    card.style.paddingBottom = `${paddingValue}px`;
  });
}

/**
 * Fetches the stored padding value if available and otherwise uses the default 
 * value. 
 */ 
function fetchAndApplyPadding() {
  chrome.runtime.sendMessage({ action: "getPadding" }, (response) => {
    addPaddingToEmailCards(response.paddingValue || '10');
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.padding) {
    addPaddingToEmailCards(request.padding);
  }
});

// Listener for messages from the popup
/* chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.padding) {
    chrome.storage.local.set({ 'paddingValue': request.padding }, function() {
      fetchAndApplyPadding();
    });
  }
}); */

/**
 * Observe for changes in the DOM as Gmail loads emails dynamically. Ensures 
 * that padding persists across pages of emails.
 */
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      fetchAndApplyPadding();
    }
  });
});

// Start observing the target node for configured mutations
const config = { childList: true, subtree: true };
observer.observe(document, config);

// Initial call to fetch and apply padding
fetchAndApplyPadding();
