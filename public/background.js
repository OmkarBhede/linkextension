chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.name && message.email && message.bio) {
      localStorage.setItem('name', message.name);
      localStorage.setItem('email', message.email);
      localStorage.setItem('bio', message.bio);
      sendResponse('Info stored successfully!');
    }
  });
  
  