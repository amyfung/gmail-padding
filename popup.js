/**
 * popup.js
 * 
 * Handles the logic for the extension's popup, including capturing user input,
 * storing the padding value given by the user, and sending it to the content 
 * script.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the current padding value, if it exists, and set it to the input 
    // field
    chrome.storage.local.get(['paddingValue'], function(result) {
        if (result.paddingValue) {
            document.getElementById('paddingInput').value = result.paddingValue;
        }
    });

    // Event listener for the apply button
    document.getElementById('applyButton').addEventListener('click', () => {
        const paddingValue = document.getElementById('paddingInput').value;

        // Store the new padding value
        chrome.storage.local.set({ 'paddingValue': paddingValue }, function() {
            console.log('Padding value is set to ' + paddingValue);
        });

        // Send message to content script to apply the new padding
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {padding: paddingValue});
        });
    });
});
