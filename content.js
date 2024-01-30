console.log("Gmail Padding Enhancer extension loaded");

/**
 * A function to be called when a message is received. The function is passed 
 * the following parameters:
 * request (Object): Contains data sent in the message.
 * sender (Object): Provides information about the sender of the message.
 * sendResponse (Function): A function to send a response back to the message 
 * sender.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.padding) {
    addPaddingToEmailCards(request.padding);
  }
});

/**
 * Applies the specified padding value to each email card. If no value is 
 * specified, a default value is used.
 * 
 * @param {String} [paddingValue='10'] - The padding value to be applied to the 
 * email cards. Defaults to '10' if not specified.
 */
function addPaddingToEmailCards(paddingValue = '10') { 
  const cards = document.querySelectorAll('tr.zA.yO, tr.zA.zE');
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

// Observe for changes in the DOM as Gmail loads emails dynamically

const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      addPaddingToEmailCards();
    }
  });
});

// Start observing the target node for configured mutations
const config = { childList: true, subtree: true };
observer.observe(document, config);

// Call initially in case the DOM is already loaded
addPaddingToEmailCards();
