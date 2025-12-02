import "./App.css";
import SpotifyAuth from "./components/SpotifyAuth";
import MapView from "./components/MapView";

function App() {
  const hasToken = !!localStorage.getItem("spotify_token");

  return hasToken ? <MapView /> : <SpotifyAuth />;
}

export default App;
