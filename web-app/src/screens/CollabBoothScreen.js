import React from 'react';
import { MOCK_ROOMS } from '../services/mockData';
import './CollabBoothScreen.css';

const CollabBoothScreen = ({ onBack }) => {
    return (
        <div className="collab-screen">
            <div className="collab-header">
                <button className="back-btn" onClick={onBack}>← Back</button>
                <h1>Collab Booths</h1>
                <button className="create-room-btn">+ New Room</button>
            </div>

            <div className="rooms-list">
                {MOCK_ROOMS.map(room => (
                    <div key={room.id} className="room-card">
                        <div className="room-info">
                            <h2>{room.name}</h2>
                            <div className="participants-row">
                                <span className="participants">{room.participants} listening</span>
                                <button className="add-user-btn" title="Add User">+</button>
                            </div>
                            <div className="room-track">
                                <img src={room.currentTrack.albumArt} alt="Album" />
                                <div className="track-details">
                                    <span className="track-name">{room.currentTrack.name}</span>
                                    <span className="artist-name">{room.currentTrack.artist}</span>
                                </div>
                            </div>
                        </div>
                        <button className="join-btn">Join</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollabBoothScreen;
