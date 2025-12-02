import React from 'react';
import './CurrentTrack.css';

function CurrentTrack({ track }) {
  if (!track) {
    return null;
  }

  return (
    <div className="current-track">
      <div className="track-info">
        <div className="track-icon">🎵</div>
        <div className="track-details">
          <div className="track-name">{track.name}</div>
          <div className="track-artist">{track.artist}</div>
        </div>
        {track.isPlaying && (
          <div className="playing-indicator">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentTrack;
