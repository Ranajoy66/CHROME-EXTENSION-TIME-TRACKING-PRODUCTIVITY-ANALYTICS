// background.js

let currentTab = null;
let startTime = Date.now();

// When user switches tab
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);

    saveTime();

    currentTab = tab.url;
    startTime = Date.now();
  } catch (err) {
    console.log("Error:", err);
  }
});

// When tab updates (URL change)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    saveTime();

    currentTab = tab.url;
    startTime = Date.now();
  }
});

// Save data to backend
function saveTime() {
  if (!currentTab) return;

  const duration = Date.now() - startTime;

  // ❌ Ignore very small time (< 2 sec)
  if (duration < 2000) return;

  if (currentTab.startsWith("chrome://")) return;

  fetch("http://localhost:5000/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      url: currentTab,
      duration
    })
  }).catch(err => console.log(err));
}