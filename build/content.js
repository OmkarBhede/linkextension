console.log("content script loaded 2");
function collectInfo() {
  console.log("collecting info");
  const nameEl = document.querySelector(".text-heading-xlarge");
  const emailEl = document.querySelector(
    ".pv-contact-info__contact-type.ci-email .pv-contact-info__contact-link"
  );
  const bioEl = document.querySelector(".text-body-medium");

  const info = {
    name: nameEl?.innerText,
    email: emailEl?.innerText,
    bio: bioEl?.innerText,
  };
  return info;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, "request");
  if (request.type === "collectInfo") {
    const info = collectInfo();
    console.log(info, "info");
    sendResponse({ success: true, payload: info });
  }
});
