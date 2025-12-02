import React, { useState } from 'react';
import './ListenersPanel.css';

const ListenersPanel = ({ listeners }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`listeners-panel ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="panel-handle" onClick={toggleExpand}>
                <div className="handle-bar"></div>
                <span className="panel-title">Nearby Listeners ({listeners.length})</span>
            </div>

            <div className="panel-content">
                {listeners.map(listener => (
                    <div key={listener.id} className="listener-card">
                        <img src={listener.track.albumArt} alt={listener.track.album} className="card-album-art" />
                        <div className="card-info">
                            <div className="card-track">{listener.track.name}</div>
                            <div className="card-artist">{listener.track.artist}</div>
                            <div className="card-meta">
                                <span className="card-user">{listener.displayName}</span>
                                <span className="card-location"> • {listener.location.city}</span>
                            </div>
                        </div>
                        <div className="card-action">
                            <button className="play-btn">▶</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListenersPanel;
