import React from "react";

const SpotifyAuth = () => {
  const handleDemoLogin = () => {
    localStorage.setItem("spotify_token", "demo-token");
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hearby</h1>
      <p style={styles.subtitle}>Discover what's playing around you.</p>
      <button
        style={styles.button}
        onClick={handleDemoLogin}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
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
    background: "linear-gradient(135deg, #121212 0%, #1e1e1e 100%)",
    color: "white",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "700",
    marginBottom: "10px",
    background: "linear-gradient(90deg, #1DB954, #1ed760)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#b3b3b3",
    marginBottom: "40px",
  },
  button: {
    padding: "18px 40px",
    fontSize: "1.1rem",
    fontWeight: "600",
    backgroundColor: "#1DB954",
    border: "none",
    borderRadius: "50px",
    color: "white",
    cursor: "pointer",
    transition: "transform 0.2s, background-color 0.2s",
    boxShadow: "0 4px 15px rgba(29, 185, 84, 0.3)",
  },
};

export default SpotifyAuth;
