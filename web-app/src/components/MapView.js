import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';
import locationManager from '../services/LocationManager';
import spotifyManager from '../services/SpotifyManager';
import { User, Track, Location, NearbyListener } from '../models';
import CurrentTrack from './CurrentTrack';
import ListenerPopup from './ListenerPopup';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icon for user location
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
      <circle cx="12" cy="12" r="10" fill="#4A90E2" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="4" fill="white"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Custom icon for nearby listeners
const listenerIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="10" fill="#1DB954" stroke="white" stroke-width="1.5"/>
    </svg>
  `),
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -12],
});

// Component to recenter map
function RecenterMap({ center }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  
  return null;
}

function MapView({ onLogout }) {
  const [userLocation, setUserLocation] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [nearbyListeners, setNearbyListeners] = useState([]);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]); // Default: NYC
  const [showSettings, setShowSettings] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    // Request location permission
    locationManager.requestLocation()
      .then(location => {
        setUserLocation(location);
        setMapCenter([location.latitude, location.longitude]);
      })
      .catch(error => {
        console.error('Location error:', error);
        // Use default location if geolocation fails (NYC for demo)
        setMapCenter([40.7128, -74.0060]);
      });

    // Start watching location
    locationManager.startWatchingLocation(location => {
      setUserLocation(location);
    });

    // Get current track
    spotifyManager.getCurrentlyPlaying().then(track => {
      setCurrentTrack(track);
    });

    // Load mock nearby listeners
    loadNearbyListeners();

    // Poll for updates every 30 seconds
    const interval = setInterval(() => {
      spotifyManager.getCurrentlyPlaying().then(track => {
        setCurrentTrack(track);
      });
      loadNearbyListeners();
    }, 30000);

    return () => {
      locationManager.stopWatchingLocation();
      clearInterval(interval);
    };
  }, []);

  const loadNearbyListeners = () => {
    // Mock data for demonstration
    const mockListeners = [
      new NearbyListener(
        new User(
          '1',
          'Sarah M.',
          'sarah_spotify',
          new Track('t1', 'Starboy', 'The Weeknd', 'Starboy', null, 230000, true),
          new Location(40.7158, -74.0070, 'New York')
        ),
        450
      ),
      new NearbyListener(
        new User(
          '2',
          'Mike J.',
          'mike_spotify',
          new Track('t2', 'Shape of You', 'Ed Sheeran', '÷', null, 233000, true),
          new Location(40.7098, -74.0040, 'New York')
        ),
        820
      ),
      new NearbyListener(
        new User(
          '3',
          'Emma L.',
          'emma_spotify',
          new Track('t3', 'Levitating', 'Dua Lipa', 'Future Nostalgia', null, 203000, true),
          new Location(40.7148, -74.0100, 'New York')
        ),
        650
      ),
    ];
    setNearbyListeners(mockListeners);
  };

  const handleCenterLocation = () => {
    if (userLocation) {
      setMapCenter([userLocation.latitude, userLocation.longitude]);
    }
  };

  const handleLogout = () => {
    spotifyManager.logout();
    onLogout();
  };

  return (
    <div className="map-view">
      <MapContainer
        center={mapCenter}
        zoom={15}
        className="map-container"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <RecenterMap center={mapCenter} />
        
        {userLocation && (
          <Marker 
            position={[userLocation.latitude, userLocation.longitude]}
            icon={userIcon}
          >
            <Popup>
              <div className="popup-content">
                <strong>You are here</strong>
                {userLocation.city && <p>{userLocation.city}</p>}
              </div>
            </Popup>
          </Marker>
        )}

        {nearbyListeners.map(listener => (
          <Marker
            key={listener.id}
            position={[listener.user.location.latitude, listener.user.location.longitude]}
            icon={listenerIcon}
          >
            <Popup>
              <ListenerPopup listener={listener} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <button className="center-button" onClick={handleCenterLocation} title="Center on my location">
        📍
      </button>

      <button className="settings-button" onClick={() => setShowSettings(!showSettings)} title="Settings">
        ⚙️
      </button>

      {showSettings && (
        <div className="settings-menu">
          <button onClick={handleLogout}>Disconnect Spotify</button>
          <button onClick={() => setShowSettings(false)}>Close</button>
        </div>
      )}

      {currentTrack && <CurrentTrack track={currentTrack} />}
    </div>
  );
}

export default MapView;
