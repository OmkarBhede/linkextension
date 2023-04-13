import React, { useEffect, useState } from "react";

function App() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage(
      {
        type: "getProfileInfo",
        context: "popup",
      },
      (response) => {
        console.log(response, "response");
        if (response.success) {
          setProfile(response.payload);
        }
      }
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        backgroundColor: "black",
      }}
    >
      {profile ? (
        <div>
          <h1>Name : {profile.name}</h1>
          <h1>Email : {profile.email}</h1>
          <h1>Bio : {profile.bio}</h1>
        </div>
      ) : (
        <div>
          <h1>Not Found</h1>
        </div>
      )}
    </div>
  );
}

export default App;
