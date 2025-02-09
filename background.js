let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  let tab = await chrome.tabs.get(activeInfo.tabId);
  trackTime(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    trackTime(tab.url);
  }
});

function trackTime(url) {
  if (!url) return;
  let domain = new URL(url).hostname;
  
  if (activeTab !== domain) {
    if (activeTab && startTime) {
      logTime(activeTab, (Date.now() - startTime) / 1000);
    }
    activeTab = domain;
    startTime = Date.now();
  }
}

function logTime(site, seconds) {
  chrome.storage.local.get([site], (result) => {
    let total = (result[site] || 0) + seconds;
    chrome.storage.local.set({ [site]: total });
  });
}