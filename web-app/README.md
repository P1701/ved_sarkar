# Hearby Web App 🎵

A mobile-first web application that connects to your Spotify account and lets you share what you're listening to with nearby music lovers. Built with React and optimized for mobile devices.

## Features

✨ **Core Features:**
- 🎧 **Spotify Integration**: Connect your Spotify account using OAuth 2.0 with PKCE
- 📍 **Location-Based Discovery**: See nearby listeners on an interactive map
- 🗺️ **OpenStreetMap View**: Beautiful map interface using Leaflet.js
- 🎵 **Real-Time Music Sharing**: Display current playing tracks from Spotify
- 👥 **Nearby Listeners**: Discover what music fans around you are listening to
- 📱 **Mobile-First Design**: Optimized for mobile devices with responsive layout

## Technology Stack

- **React** 18.x - UI framework
- **Leaflet.js** - Interactive map display with OpenStreetMap
- **JavaScript/ES6+** - Modern JavaScript features
- **CSS3** - Mobile-first responsive design
- **Browser Geolocation API** - Location services
- **Spotify Web API** - Music playback data

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn
- Spotify Developer Account (for API credentials)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jthibault03/hearby.git
   cd hearby/web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Spotify Credentials**
   
   Edit `src/services/SpotifyManager.js` and update:
   ```javascript
   this.clientId = 'YOUR_SPOTIFY_CLIENT_ID';
   this.redirectUri = `${window.location.origin}/callback`;
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open in your browser**
   ```
   http://localhost:3000
   ```

### Spotify Developer Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add your redirect URI (e.g., `http://127.0.0.1:3000/callback` for development)
4. Copy your Client ID and update the app configuration

## Project Structure

```
web-app/
├── public/
│   ├── index.html          # HTML template with mobile meta tags
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # React components
│   │   ├── SpotifyAuth.js  # Authentication screen
│   │   ├── MapView.js      # Main map view
│   │   ├── CurrentTrack.js # Current track widget
│   │   └── ListenerPopup.js # Listener detail popup
│   ├── services/           # Business logic
│   │   ├── SpotifyManager.js   # Spotify authentication & API
│   │   └── LocationManager.js  # Geolocation services
│   ├── models/             # Data models
│   │   └── index.js        # User, Track, Location models
│   ├── App.js              # Main app component
│   ├── App.css             # Global styles
│   └── index.js            # Entry point
└── package.json            # Dependencies
```

## Mobile Optimization

The app is built with a mobile-first approach:

- **Responsive Design**: Adapts to all screen sizes
- **Touch-Friendly**: Large tap targets and gestures
- **Viewport Optimization**: Proper meta tags for mobile browsers
- **PWA Ready**: Can be installed as a Progressive Web App
- **Performance**: Optimized bundle size and lazy loading

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 8+)

## License

MIT License - see LICENSE file for details

---

Built with ❤️ for music lovers everywhere 🎵
