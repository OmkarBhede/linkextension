function collectInfo() {
  const nameEl = document.querySelector(".pv-top-card-section__name");
  const emailEl = document.querySelector(
    ".pv-contact-info__contact-type.ci-email .pv-contact-info__contact-link"
  );
  const bioEl = document.querySelector(
    ".pv-about-section .pv-about__summary-text"
  );

  if (nameEl && emailEl && bioEl) {
    const name = nameEl.innerText;
    const email = emailEl.innerText;
    const bio = bioEl.innerText;
    const info = { name, email, bio };
    chrome.runtime.sendMessage(info, (response) => {
      console.log(response);
    });
  } else {
    console.log("Some elements were not found on the page.");
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "collect-info") {
    collectInfo();
    sendResponse({ message: "Info collected successfully." });
  }
});
