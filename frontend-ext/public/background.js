// background.js

// Function to open the extension popup
const openPopup = () => {
  chrome.action.openPopup();
};

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Check if the message is to open the popup
  if (message.type === "openPopup") {
    console.log("next is pop up fn")
    openPopup();
  }
});

// Function to fetch company data
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/companies/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    return null;
  }
}

// Listen for messages from content script to fetch company data
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // Check if the message contains company data
  if (message.type === "fetchCompanyData") {
    // Fetch data and send it back to the content script
    const data = await fetchData();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "companyData", data });
    });
  }
});
