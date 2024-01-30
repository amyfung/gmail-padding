document.getElementById('applyButton').addEventListener('click', () => {
    const paddingValue = document.getElementById('paddingInput').value;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {padding: paddingValue});
    });
  });
  