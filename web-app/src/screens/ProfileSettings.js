import React, { useState } from 'react';
import { MOCK_USER } from '../services/mockData';
import './ProfileSettings.css';

const ProfileSettings = ({ onBack, onLogout }) => {
    const [privacy, setPrivacy] = useState(true);

    return (
        <div className="profile-screen">
            <div className="profile-header">
                <button className="back-btn" onClick={onBack}>← Back</button>
                <h1>Settings</h1>
            </div>

            <div className="profile-content">
                <div className="user-section">
                    <div className="large-avatar" style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${MOCK_USER.username})` }}></div>
                    <h2>{MOCK_USER.displayName}</h2>
                    <p>@{MOCK_USER.username}</p>
                </div>

                <div className="settings-group">
                    <h3>Privacy</h3>
                    <div className="setting-item">
                        <div className="setting-label">
                            <span>Share Listening Activity</span>
                            <p>Allow nearby users to see what you're listening to</p>
                        </div>
                        <label className="switch">
                            <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>

                <div className="settings-group">
                    <h3>Account</h3>
                    <button className="danger-btn" onClick={onLogout}>Disconnect Spotify</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
