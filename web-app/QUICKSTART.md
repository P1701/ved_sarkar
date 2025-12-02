# Quick Start Guide - Hearby Web App

Get Hearby up and running in just a few minutes!

## 🚀 5-Minute Setup

### 1. Prerequisites Check
```bash
# Check Node.js version (need 14+)
node --version

# Check npm
npm --version
```

### 2. Clone and Install
```bash
# Clone the repo
git clone https://github.com/jthibault03/hearby.git
cd hearby/web-app

# Install dependencies
npm install
```

### 3. Configure Spotify (Optional for Testing)
The app works with mock data out of the box. To use real Spotify:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URI: `http://127.0.0.1:3000/callback`
4. Edit `src/services/SpotifyManager.js`:
   ```javascript
   this.clientId = 'YOUR_CLIENT_ID_HERE';
   ```

### 4. Run the App
```bash
npm start
```

Your browser will open to `http://localhost:3000`

### 5. Test on Mobile
- Open the same URL on your mobile device (same network)
- Or use browser DevTools mobile emulation:
  - Chrome: F12 → Toggle device toolbar
  - Safari: Develop → Enter Responsive Design Mode

## 📱 Features to Try

1. **Authentication**: Click "Connect with Spotify"
2. **Map View**: See the interactive OpenStreetMap
3. **Nearby Listeners**: Tap on green markers (mock data)
4. **Current Track**: View your playing song at the bottom
5. **Settings**: Tap gear icon to disconnect

## 🛠️ Build for Production

```bash
npm run build
```

Output is in `build/` directory - ready to deploy!

## 🎯 Mobile Testing Tips

### Test in Chrome DevTools
1. Open DevTools (F12)
2. Click device toggle icon
3. Select "iPhone 12 Pro" or custom dimensions
4. Test touch interactions

### Test on Real Device
1. Find your computer's local IP:
   ```bash
   # Mac/Linux
   ifconfig | grep inet
   
   # Windows
   ipconfig
   ```
2. On phone, open: `http://YOUR_IP:3000`
3. Allow location when prompted

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use different port
PORT=3001 npm start
```

### Location Not Working
- Use HTTPS in production (required for geolocation)
- Check browser permissions
- Try: chrome://settings/content/location

### Map Tiles Not Loading
- Check internet connection
- Disable ad blockers temporarily
- OpenStreetMap may be rate-limiting

### Spotify Auth Issues
- Verify Client ID is correct
- Check redirect URI matches exactly
- Clear browser localStorage

## 📦 Project Structure

```
web-app/
├── src/
│   ├── components/      # UI components
│   ├── services/        # Business logic
│   ├── models/          # Data models
│   └── App.js          # Main app
├── public/             # Static files
└── package.json        # Dependencies
```

## 🎨 Customization

### Change Theme Colors
Edit component CSS files:
- `src/components/SpotifyAuth.css` - Auth screen
- `src/components/MapView.css` - Map view
- `src/App.css` - Global styles

### Change Default Location
Edit `src/components/MapView.js`:
```javascript
const [mapCenter, setMapCenter] = useState([YOUR_LAT, YOUR_LNG]);
```

### Add More Mock Listeners
Edit `loadNearbyListeners()` in `MapView.js`

## 📚 Next Steps

- Read the full [README](README.md)
- Explore the [component documentation](src/components/)
- Set up [real Spotify integration](README.md#api-integration)
- Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)

## 💡 Tips

- **PWA**: App can be installed on mobile devices
- **Performance**: Use `npm run build` for optimized production build
- **Mobile First**: Designed for mobile, works great on desktop too
- **Live Reload**: Changes auto-reload during development

## 🎉 You're Ready!

Start building and customizing Hearby for your needs. Happy coding! 🎵

---

Questions? [Open an issue](https://github.com/jthibault03/hearby/issues)
