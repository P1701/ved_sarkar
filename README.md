# Hearby 🎵

**Hearby** is a mobile-first web application that connects to your Spotify data and lets you share what you're currently listening to with nearby music listeners. Discover what people around you are jamming to in real-time on an interactive OpenStreetMap-style view!

## Features

✨ **Core Features:**
- 🎧 **Spotify Integration**: Connect your Spotify account to share what you're listening to
- 📍 **Location-Based Discovery**: See nearby listeners on an interactive map
- 🗺️ **OpenStreetMap Style View**: Shows a map interface with your current location and city
- 🎵 **Real-Time Music Sharing**: Display current playing tracks from Spotify
- 👥 **Nearby Listeners**: Discover what music fans around you are listening to
- 📱 **Mobile-First Design**: Optimized for mobile devices with responsive, touch-friendly UI
- 🔒 **Privacy-Focused**: Location permissions and data handling built with privacy in mind

## Architecture

The app is built as a modern web application using React:

### Key Components

1. **SpotifyManager**: Handles Spotify OAuth authentication (PKCE) and playback data
2. **LocationManager**: Manages browser geolocation services and permissions
3. **MapView**: Main view with Leaflet map and nearby listeners
4. **Models**: Data structures for User, Track, Location, and NearbyListener

### Technology Stack

- **Frontend**: React 18.x with modern JavaScript/ES6+
- **Map**: Leaflet.js with OpenStreetMap tiles
- **Styling**: CSS3 with mobile-first responsive design
- **Location**: Browser Geolocation API
- **Authentication**: OAuth 2.0 with PKCE for Spotify

### File Structure

```
hearby/
├── web-app/                        # React Web Application
│   ├── public/
│   │   ├── index.html             # HTML template with mobile meta tags
│   │   └── manifest.json          # PWA manifest
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── SpotifyAuth.js     # Spotify authentication UI
│   │   │   ├── MapView.js         # Main map view
│   │   │   ├── CurrentTrack.js    # Current track widget
│   │   │   └── ListenerPopup.js   # Listener detail popup
│   │   ├── services/              # Business logic
│   │   │   ├── SpotifyManager.js  # Spotify integration
│   │   │   └── LocationManager.js # Location services
│   │   ├── models/                # Data models
│   │   │   └── index.js           # User, Track, Location models
│   │   ├── App.js                 # Main app component
│   │   └── App.css                # Global styles
│   ├── package.json               # Dependencies
│   └── README.md                  # Detailed web app documentation
├── Hearby/                        # Legacy iOS App (Swift/UIKit)
└── Documentation/
```

## Prerequisites

- Node.js 14.0 or later
- npm or yarn
- Modern web browser (Chrome, Safari, Firefox, Edge)
- Spotify Developer Account (for API credentials)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/jthibault03/hearby.git
cd hearby/web-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Spotify Credentials

1. Create a Spotify Developer account at [developer.spotify.com](https://developer.spotify.com)
2. Create a new app in your Spotify Developer Dashboard
3. Add `http://127.0.0.1:3000/callback'` to your Redirect URIs (for development)
4. Update `src/services/SpotifyManager.js` with your credentials:

```javascript
this.clientId = 'YOUR_SPOTIFY_CLIENT_ID';
```

### 4. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

## Usage

1. **First Launch**: Tap "Connect with Spotify" to authenticate
2. **Grant Permissions**: Allow location access when prompted by your browser
3. **Explore**: View the map showing your location and nearby listeners
4. **Discover**: Tap on map markers to see what others are listening to
5. **Share**: Your currently playing track is displayed at the bottom

## Mobile Optimization

The app is designed with a mobile-first approach:

- **Responsive Layout**: Adapts to any screen size
- **Touch Controls**: Optimized for touch interactions
- **Mobile Viewport**: Proper viewport meta tags
- **PWA Support**: Can be installed as a Progressive Web App
- **Safe Areas**: Supports notched devices
- **Performance**: Optimized bundle size

## Development

### Mock Data

The current implementation includes mock data for demonstration:
- Mock Spotify authentication flow
- Sample nearby listeners
- Example tracks

For production, you'll need to:
1. Implement actual Spotify API calls
2. Set up a backend service for user discovery
3. Implement real-time data synchronization

### Future Enhancements

- [ ] Real Spotify SDK integration
- [ ] Backend service for user discovery
- [ ] Real-time WebSocket updates
- [ ] Friend system
- [ ] Music recommendations based on nearby listeners
- [ ] Social features (like, comment, share)
- [ ] Privacy controls (invisible mode, radius control)
- [ ] Push notifications

## Technologies Used

- **React**: Modern UI framework
- **Leaflet.js**: Interactive maps with OpenStreetMap
- **JavaScript/ES6+**: Modern JavaScript features
- **CSS3**: Responsive mobile-first design
- **Browser APIs**: Geolocation, LocalStorage
- **Spotify Web API**: Music playback data (OAuth 2.0 + PKCE)

## Security & Privacy

- Location data is only used for displaying on the map
- Spotify authentication uses OAuth 2.0 with PKCE (no client secret)
- No personal data is stored permanently
- Users can disconnect at any time
- HTTPS required for production (geolocation requirement)

## Browser Support

- Chrome/Edge 90+
- Safari 14+ (including Mobile Safari)
- Firefox 88+
- Mobile browsers on iOS 14+ and Android 8+

## License

This project is open source and available under the MIT License.

---

Built with ❤️ for music lovers everywhere
