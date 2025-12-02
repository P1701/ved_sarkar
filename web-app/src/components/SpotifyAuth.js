import React from "react";
import "./SpotifyAuth.css"; // ok if file exists, or you can delete this line if you prefer inline styles

const SpotifyAuth = () => {
  const handleDemoLogin = () => {
    console.log("Demo login clicked");
    localStorage.setItem("spotify_token", "demo-token");
    window.location.reload(); // reload so App.js re-renders and shows MapView
  };

  return (
    <div className="spotify-auth-container">
      <h1 className="spotify-auth-title">Hearby</h1>
      <button className="spotify-auth-button" onClick={handleDemoLogin}>
        Connect with Spotify (Demo Mode)
      </button>
    </div>
  );
};

export default SpotifyAuth;
