import "./App.css";
import SpotifyAuth from "./components/SpotifyAuth";
import MapView from "./components/MapView";

function App() {
  const hasToken = !!localStorage.getItem("spotify_token");

  // If we have a (fake) Spotify token, show the main app (map)
  // Otherwise show the login screen
  return hasToken ? <MapView /> : <SpotifyAuth />;
}

export default App;
