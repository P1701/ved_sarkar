import React from 'react';
import './ListenerPopup.css';

function ListenerPopup({ listener }) {
  const formatDistance = (meters) => {
    if (meters < 1000) {
      return `${Math.round(meters)}m away`;
    }
    return `${(meters / 1000).toFixed(1)}km away`;
  };

  return (
    <div className="listener-popup">
      <div className="listener-name">{listener.user.displayName}</div>
      {listener.user.currentTrack && (
        <div className="listener-track">
          <div className="track-title">{listener.user.currentTrack.name}</div>
          <div className="track-artist-small">{listener.user.currentTrack.artist}</div>
        </div>
      )}
      <div className="listener-distance">{formatDistance(listener.distance)}</div>
    </div>
  );
}

export default ListenerPopup;
