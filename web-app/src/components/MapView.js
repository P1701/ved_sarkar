import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import './MapView.css';
import locationManager from '../services/LocationManager';
import spotifyManager from '../services/SpotifyManager';
import { MOCK_LISTENERS, MOCK_FRIENDS, MOCK_USER } from '../services/mockData';
import CurrentTrack from './CurrentTrack';
import ListenersPanel from './ListenersPanel';

import HeatmapLayer from './HeatmapLayer';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Helper to add random jitter (~100-200m)
const addJitter = (lat, lng) => {
  const JITTER_AMOUNT = 0.002; // Approx 200m
  return [
    lat + (Math.random() - 0.5) * JITTER_AMOUNT,
    lng + (Math.random() - 0.5) * JITTER_AMOUNT
  ];
};

// Custom Album Icon
const createAlbumIcon = (albumArtUrl, isFriend) => {
  return L.divIcon({
    className: 'album-marker',
    html: `<div class="album-art-marker ${isFriend ? 'friend-marker' : 'ghost-marker'}" style="background-image: url('${albumArtUrl}')"></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

function MapView({ onLogout, onOpenSettings, onOpenCollab }) {
  const [userLocation, setUserLocation] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [mapCenter, setMapCenter] = useState([37.8715, -122.2730]); // Berkeley
  const [showFriends, setShowFriends] = useState(false);
  const [friendSearch, setFriendSearch] = useState('');
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Get initial location
    locationManager.requestLocation().then(loc => {
      setUserLocation(loc);
      setMapCenter([loc.latitude, loc.longitude]);
    });

    // Get current track
    spotifyManager.getCurrentlyPlaying().then(track => {
      setCurrentTrack(track);
    });
  }, []);

  const filteredFriends = MOCK_FRIENDS.filter(f =>
    f.displayName.toLowerCase().includes(friendSearch.toLowerCase()) ||
    f.username.toLowerCase().includes(friendSearch.toLowerCase())
  );

  // Prepare heatmap points
  const heatmapPoints = MOCK_LISTENERS.map(listener => [
    listener.location.latitude,
    listener.location.longitude,
    0.8 // Intensity
  ]);

  return (
    <div className="map-view">
      <MapContainer
        center={mapCenter}
        zoom={14}
        className="map-container"
        zoomControl={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Heatmap Removed as per request */}

        {/* User Location */}
        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            eventHandlers={{
              click: () => {
                if (map) map.flyTo([userLocation.latitude, userLocation.longitude], 16);
              }
            }}
          >
            <Popup>You are here</Popup>
          </Marker>
        )}


        {/* Album Art Markers */}
        {MOCK_LISTENERS.map(listener => {
          // Determine position: Exact for friends, Jittered for strangers
          const position = listener.isFriend
            ? [listener.location.latitude, listener.location.longitude]
            : addJitter(listener.location.latitude, listener.location.longitude);

          return (
            <Marker
              key={listener.id}
              position={position}
              icon={createAlbumIcon(listener.track.albumArt, listener.isFriend)}
            >
              <Popup className="music-popup">
                <div className="popup-content">
                  <img src={listener.track.albumArt} alt="Album" className="popup-album" />
                  <div className="popup-info">
                    <strong>{listener.track.name}</strong>
                    <p>{listener.track.artist}</p>
                    {/* Hide name for strangers to enhance privacy vibe */}
                    <span className="listener-name">
                      {listener.isFriend ? listener.displayName : 'Nearby Listener'}
                    </span>
                    {listener.isFriend && <span className="friend-badge">Friend</span>}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* UI Overlays */}
      <div className="top-bar">
        <h1 className="app-title">Hearby</h1>
        <div className="top-actions">
          <div className="friends-dropdown-container">
            <button className="collab-btn" onClick={() => setShowFriends(!showFriends)}>
              👥 Friends
            </button>
            {showFriends && (
              <div className="friends-dropdown">
                <input
                  type="text"
                  placeholder="Search friends..."
                  className="friend-search"
                  value={friendSearch}
                  onChange={(e) => setFriendSearch(e.target.value)}
                />
                <div className="friends-list">
                  {filteredFriends.map(friend => (
                    <div key={friend.id} className="friend-item">
                      <div className="friend-avatar" style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${friend.username})` }}></div>
                      <div className="friend-info">
                        <span className="friend-name">{friend.displayName}</span>
                        <span className={`friend-status ${friend.isOnline ? 'online' : 'offline'}`}>
                          {friend.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button className="collab-btn" onClick={onOpenCollab}>
            🎤 Booths
          </button>
          <button className="settings-btn" onClick={onOpenSettings}>
            <div className="avatar" style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${MOCK_USER.username})` }}></div>
          </button>
        </div>
      </div>

      <ListenersPanel listeners={MOCK_LISTENERS} />

      {/* Recenter Button Overlay */}
      <button
        className="recenter-btn"
        style={{
          position: 'absolute',
          bottom: '160px', // Above the listeners panel
          right: '20px',
          zIndex: 1000
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (map && userLocation) {
            map.flyTo([userLocation.latitude, userLocation.longitude], 15);
          }
        }}
        title="Recenter Map"
      >
        📍
      </button>

      {currentTrack && <CurrentTrack track={currentTrack} />}
    </div>
  );
}

export default MapView;
