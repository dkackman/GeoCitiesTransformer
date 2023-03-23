(async () => {
  const { isEnabled } = await new Promise((resolve) =>
    chrome.storage.local.get("isEnabled", resolve)
  );
  const cssFileURL = chrome.runtime.getURL("geocities.css");
  const backgroundImageURL = chrome.runtime.getURL("images/cloud.jpg");

  const styleElement = document.createElement("style");
  styleElement.id = "geocities-style";

  if (isEnabled) {
    const response = await fetch(cssFileURL);
    const cssText = await response.text();
    styleElement.textContent = `${cssText}\nhtml > body { background-image: url('${backgroundImageURL}') !important; }`;
    document.head.appendChild(styleElement);
  } else {
    const existingStyle = document.head.querySelector("#geocities-style");
    if (existingStyle) {
      document.head.removeChild(existingStyle);
    }
  }
})();
