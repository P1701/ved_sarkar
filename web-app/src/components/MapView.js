// src/components/MapView.js
import React, { useState, useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import locationManager from "../services/LocationManager";
import HeatmapLayer from "./HeatmapLayer";

// Blue dot icon for user's location
const userIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <circle cx="12" cy="12" r="10" fill="#4A90E2" stroke="white" stroke-width="2"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
      </svg>
    `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Custom bubble icon for nearby users
const createUserIcon = (user) =>
  L.divIcon({
    className: "user-marker-icon",
    html: `
      <div class="user-marker">
        <div class="user-marker-name">${user.name}</div>
        <div class="user-marker-track">
          ${
            user.nowPlaying
              ? `Now: ${user.nowPlaying}`
              : `Fav: ${user.favorite}`
          }
        </div>
      </div>
    `,
    iconAnchor: [40, 40],
  });

// Helper that guarantees a Leaflet map instance + tracks zoom
function MapReady({ onReady, onZoomChange }) {
  const map = useMap();

  useEffect(() => {
    onReady(map);

    if (!onZoomChange) return;

    // set initial zoom
    onZoomChange(map.getZoom());

    const handleZoom = () => {
      onZoomChange(map.getZoom());
    };

    map.on("zoomend", handleZoom);
    return () => {
      map.off("zoomend", handleZoom);
    };
  }, [map, onReady, onZoomChange]);

  return null;
}

function MapView() {
  const defaultCoords = [37.8715, -122.2730]; // Berkeley fallback

  const [userLocation, setUserLocation] = useState({
    latitude: defaultCoords[0],
    longitude: defaultCoords[1],
  });

  const [mapCenter, setMapCenter] = useState(defaultCoords);
  const [zoomLevel, setZoomLevel] = useState(15);
  const mapRef = useRef(null);

  // Try to get real GPS
  useEffect(() => {
    locationManager
      .requestLocation()
      .then((loc) => {
        setUserLocation(loc);
        setMapCenter([loc.latitude, loc.longitude]);
      })
      .catch(() => {
        // fallback stays Berkeley
      });
  }, []);

  // Heatmap mock points around you
  const heatmapPoints = useMemo(() => {
    const lat = userLocation.latitude;
    const lng = userLocation.longitude;

    const random = (max) => (Math.random() - 0.5) * max;

    const points = [];

    // 🔥 Album hotspot (close cluster)
    for (let i = 0; i < 20; i++) {
      points.push({
        lat: lat + random(0.001),
        lng: lng + random(0.001),
        intensity: 0.9,
      });
    }

    // 🎧 Mixed hotspot (larger cluster)
    for (let i = 0; i < 25; i++) {
      points.push({
        lat: lat + random(0.002),
        lng: lng + random(0.002),
        intensity: 0.6,
      });
    }

    // 👥 Light background users
    for (let i = 0; i < 15; i++) {
      points.push({
        lat: lat + random(0.003),
        lng: lng + random(0.003),
        intensity: 0.3,
      });
    }

    return points;
  }, [userLocation]);

  // Mock nearby users with current / favorite songs
  const listeningUsers = useMemo(() => {
    const baseLat = userLocation.latitude;
    const baseLng = userLocation.longitude;

    const random = (max) => (Math.random() - 0.5) * max;

    const rawUsers = [
      {
        id: "u1",
        name: "Maya",
        nowPlaying: "FE!N – Travis Scott",
        favorite: "Snooze – SZA",
      },
      {
        id: "u2",
        name: "Liam",
        nowPlaying: "",
        favorite: "Nights – Frank Ocean",
      },
      {
        id: "u3",
        name: "Sofia",
        nowPlaying: "On My Mama – Victoria Monét",
        favorite: "Kill Bill – SZA",
      },
      {
        id: "u4",
        name: "Jay",
        nowPlaying: "",
        favorite: "See You Again – Tyler, The Creator",
      },
    ];

    // Scatter them near you
    return rawUsers.map((user) => ({
      ...user,
      lat: baseLat + random(0.0018),
      lng: baseLng + random(0.0018),
    }));
  }, [userLocation]);

  // Recenter button
  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.flyTo(
        [userLocation.latitude, userLocation.longitude],
        15,
        { duration: 1.2 }
      );
    }
  };

  return (
    <div className="map-view">
      <MapContainer
        center={mapCenter}
        zoom={15}
        className="map-container"
        zoomControl={false}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <MapReady
          onReady={(map) => (mapRef.current = map)}
          onZoomChange={setZoomLevel}
        />

        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* HEATMAP */}
        <HeatmapLayer points={heatmapPoints} radius={25} blur={20} />

        {/* YOUR LOCATION */}
        <Marker
          position={[userLocation.latitude, userLocation.longitude]}
          icon={userIcon}
        />

        {/* NEARBY USERS – only show when zoomed in enough */}
        {zoomLevel >= 14 &&
          listeningUsers.map((user) => (
            <Marker
              key={user.id}
              position={[user.lat, user.lng]}
              icon={createUserIcon(user)}
            />
          ))}
      </MapContainer>

      {/* SMALL TOP-LEFT LOGO */}
      <div className="map-logo">Hearby</div>

      {/* RECENTER BUTTON */}
      <button className="recenter-button" onClick={handleRecenter}>
        ⦿
      </button>

      {/* CUSTOM BOTTOM-LEFT ZOOM BUTTONS */}
      <div className="zoom-controls">
        <button onClick={() => mapRef.current?.zoomIn()}>+</button>
        <button onClick={() => mapRef.current?.zoomOut()}>−</button>
      </div>
    </div>
  );
}

export default MapView;
