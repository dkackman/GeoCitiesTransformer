chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({ isEnabled: false });
});

chrome.action.onClicked.addListener(async (tab) => {
  const { isEnabled } = await chrome.storage.local.get("isEnabled");
  const newValue = !isEnabled;
  await chrome.storage.local.set({ isEnabled: newValue });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });
});
