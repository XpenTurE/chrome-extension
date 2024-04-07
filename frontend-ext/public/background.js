
const openPopup = () => {
  chrome.action.openPopup();
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "openPopup") {
    console.log("next is pop up fn")
    openPopup();
  }
});

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

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "fetchCompanyData") {
    const data = await fetchData();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "companyData", data });
    });
  }
});
