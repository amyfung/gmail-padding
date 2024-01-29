console.log("Gmail Padding Enhancer extension loaded");

// Selects the email cards and adds padding to each card.
function addPaddingToEmailCards() {
  // Select both types of email cards
  const cards = document.querySelectorAll('tr.zA.yO, tr.zA.zE');

  cards.forEach(card => {
    card.classList.add('enhanced-padding');
  });
}

// Observe for changes in the DOM as Gmail loads emails dynamically
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      addPaddingToEmailCards();
    }
  }
});

// Start observing the target node for configured mutations
const config = { childList: true, subtree: true };
observer.observe(document, config);

// Call initially in case the DOM is already loaded
addPaddingToEmailCards();
