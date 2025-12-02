import React, { useState } from 'react';
import "./App.css";
import SpotifyAuth from "./components/SpotifyAuth";
import MapView from "./components/MapView";
import CollabBoothScreen from "./screens/CollabBoothScreen";
import ProfileSettings from "./screens/ProfileSettings";

function App() {
  const hasToken = !!localStorage.getItem("spotify_token");
  const [currentScreen, setCurrentScreen] = useState('map');

  if (!hasToken) {
    return <SpotifyAuth />;
  }

  const handleLogout = () => {
    localStorage.removeItem("spotify_token");
    window.location.reload();
  };

  switch (currentScreen) {
    case 'collab':
      return <CollabBoothScreen onBack={() => setCurrentScreen('map')} />;
    case 'settings':
      return <ProfileSettings onBack={() => setCurrentScreen('map')} onLogout={handleLogout} />;
    case 'map':
    default:
      return (
        <MapView
          onLogout={handleLogout}
          onOpenSettings={() => setCurrentScreen('settings')}
          onOpenCollab={() => setCurrentScreen('collab')}
        />
      );
  }
}

export default App;
