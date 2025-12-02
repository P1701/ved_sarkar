import React from "react";

const SpotifyAuth = () => {
  const handleDemoLogin = () => {
    console.log("Clicked demo login");

    // Fake "logged in" state for demo purposes
    localStorage.setItem("spotify_token", "demo-token");

    // Reload the app so App.js can switch screens
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hearby</h1>
      <button style={styles.button} onClick={handleDemoLogin}>
        Connect with Spotify (Demo Mode)
      </button>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#121212",
    color: "white",
  },
  title: {
    fontSize: "48px",
    marginBottom: "40px",
  },
  button: {
    padding: "16px 32px",
    fontSize: "18px",
    backgroundColor: "#1DB954",
    border: "none",
    borderRadius: "50px",
    color: "white",
    cursor: "pointer",
  },
};

export default SpotifyAuth;
