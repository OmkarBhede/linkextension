import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  useEffect(() => {
    getProfile()
    
  }, [])

  const getProfile = () => {
    // eslint-disable-next-line no-def
    chrome.runtime.sendMessage(
      
    )
  }
  
  const openLinkedIn = () => {
    const nameElem = document.querySelector(".pv-top-card-section__name");
    const emailElem = document.querySelector(
      ".pv-contact-info__contact-type.ci-email .pv-contact-info__contact-link"
    );
    const bioElem = document.querySelector(
      ".pv-about-section .pv-about__summary-text"
    );

    if (nameElem && emailElem && bioElem) {
      const name = nameElem.innerText;
      const email = emailElem.innerText;
      const bio = bioElem.innerText;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("bio", bio);

      alert("Information collected successfully!");
    } else {
      console.error("One or more required elements not found.");
    }
  };

  return (
    <div>
      <button onClick={openLinkedIn}>Open LinkedIn</button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
