import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const addJitter = (lat, lng) => {
  return [
    lat + (Math.random() - 0.5) * 0.002,
    lng + (Math.random() - 0.5) * 0.002
  ];
};

const createAlbumIcon = (albumArtUrl, isFriend) => {
  return L.divIcon({
    className: 'album-marker',
    html: `<div class="album-art-marker ${isFriend ? 'friend-marker' : 'ghost-marker'}" style="background-image: url('${albumArtUrl}')"></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

const FEATURED_CITY_CLUSTERS = [
  { name: 'Berkeley', lat: 37.8715, lng: -122.2730, baseIntensity: 0.9 },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194, baseIntensity: 0.85 },
  { name: 'Oakland', lat: 37.8044, lng: -122.2711, baseIntensity: 0.8 },
  { name: 'San Jose', lat: 37.3382, lng: -121.8863, baseIntensity: 0.75 },
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, baseIntensity: 0.85 },
  { name: 'Sacramento', lat: 38.5816, lng: -121.4944, baseIntensity: 0.7 },
  { name: 'Seattle', lat: 47.6062, lng: -122.3321, baseIntensity: 0.7 },
  { name: 'Portland', lat: 45.5152, lng: -122.6784, baseIntensity: 0.65 },
  { name: 'New York', lat: 40.7128, lng: -74.0060, baseIntensity: 0.9 },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298, baseIntensity: 0.8 },
  { name: 'Atlanta', lat: 33.7490, lng: -84.3880, baseIntensity: 0.75 },
  { name: 'Houston', lat: 29.7604, lng: -95.3698, baseIntensity: 0.75 },
];

const DEFAULT_CENTER = [37.8715, -122.2730];

function MapView({ onLogout, onOpenSettings, onOpenCollab }) {
  const [userLocation, setUserLocation] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [showFriends, setShowFriends] = useState(false);
  const [friendSearch, setFriendSearch] = useState('');
  const [map, setMap] = useState(null);

  useEffect(() => {
    locationManager.requestLocation().then(loc => {
      setUserLocation(loc);
      setMapCenter([loc.latitude, loc.longitude]);
    }).catch(() => {
      setMapCenter(DEFAULT_CENTER);
    });

    spotifyManager.getCurrentlyPlaying().then(track => {
      setCurrentTrack(track);
    });
  }, []);

  const filteredFriends = MOCK_FRIENDS.filter(f =>
    f.displayName.toLowerCase().includes(friendSearch.toLowerCase()) ||
    f.username.toLowerCase().includes(friendSearch.toLowerCase())
  );

  const heatmapPoints = useMemo(() => {
    const points = [];
    const random = (max) => (Math.random() - 0.5) * max;

    const addCluster = (centerLat, centerLng, count, baseIntensity, spread) => {
      for (let i = 0; i < count; i++) {
        points.push({
          lat: centerLat + random(spread),
          lng: centerLng + random(spread),
          intensity: baseIntensity * (0.7 + Math.random() * 0.3),
        });
      }
    };

    const [fallbackLat, fallbackLng] = DEFAULT_CENTER;
    const lat = userLocation ? userLocation.latitude : fallbackLat;
    const lng = userLocation ? userLocation.longitude : fallbackLng;

    addCluster(lat, lng, 30, 0.9, 0.0015);
    addCluster(lat, lng, 25, 0.6, 0.003);

    FEATURED_CITY_CLUSTERS.forEach(
      ({ lat: cityLat, lng: cityLng, baseIntensity }) => {
        addCluster(cityLat, cityLng, 40, baseIntensity, 0.03);
        addCluster(cityLat, cityLng, 30, baseIntensity * 0.7, 0.06);
      }
    );

    return points;
  }, [userLocation]);

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

        <HeatmapLayer points={heatmapPoints} radius={25} blur={20} />

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

        {MOCK_LISTENERS.map(listener => {
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
                      <div
                        className="friend-avatar"
                        style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${friend.username})` }}
                      ></div>
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
            <div
              className="avatar"
              style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${MOCK_USER.username})` }}
            ></div>
          </button>
        </div>
      </div>

      <ListenersPanel listeners={MOCK_LISTENERS} />

      <button
        className="recenter-btn"
        style={{
          position: 'absolute',
          bottom: '160px',
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
