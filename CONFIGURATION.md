# Hearby Configuration Template

## Spotify API Credentials

### Development // this stuff is in .env
```
Client ID: YOUR_SPOTIFY_CLIENT_ID
Client Secret: YOUR_SPOTIFY_CLIENT_SECRET
Redirect URI: hearby://spotify-callback
```

### Required Configuration Steps

1. **Create Spotify Developer App**
   - Visit: https://developer.spotify.com/dashboard
   - Click "Create an App"
   - Fill in app details:
     - App Name: Hearby
     - App Description: Social music sharing app
     - Website: (your website or GitHub repo)
   
2. **Configure Redirect URI**
   - In your app settings, add: `hearby://spotify-callback`
   - This must match the URL scheme in Info.plist

3. **Update Code**
   - Open `Hearby/Hearby/SpotifyManager.swift`
   - Replace `YOUR_SPOTIFY_CLIENT_ID` with your actual Client ID
   - For production, move Client Secret to secure backend

## Backend Service Configuration (Future)

When implementing the backend service, configure:

```yaml
# Example configuration
backend:
  url: https://api.hearby.com
  websocket: wss://api.hearby.com/ws
  
database:
  host: localhost
  port: 5432
  name: hearby_db
  
redis:
  host: localhost
  port: 6379
  
security:
  jwt_secret: YOUR_JWT_SECRET
  encryption_key: YOUR_ENCRYPTION_KEY
```

## App Bundle Identifier

Default: `com.hearby.app`

To change:
1. Open Xcode project
2. Select Hearby target
3. Update Bundle Identifier in General tab

## Location Services

The app requires:
- `NSLocationWhenInUseUsageDescription`: Already configured
- `NSLocationAlwaysAndWhenInUseUsageDescription`: Already configured

## Privacy Settings

Configure in `Info.plist`:
- Location permissions: ✅ Already set
- Background modes: May need for background location
- Network usage: For API calls

## Build Configuration

### Debug
- Mock data enabled
- Verbose logging
- Local development

### Release
- Production API endpoints
- Analytics enabled
- Crash reporting

## Environment Variables

Create a `.env` file (not tracked in git) for local development:

```bash
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
BACKEND_URL=http://localhost:8080
```

## Testing Configuration

For testing with mock data:
1. Keep default configuration
2. App uses mock Spotify responses
3. Mock nearby listeners appear on map

## App Store Configuration

Before submission:
1. Update all placeholder IDs
2. Configure production endpoints
3. Add privacy policy URL
4. Prepare app screenshots
5. Write app description

## Troubleshooting

### Spotify Authentication Fails
- Verify Client ID is correct
- Check redirect URI matches exactly
- Ensure URL scheme is in Info.plist

### Location Not Working
- Check location permissions granted
- Verify Info.plist has required keys
- Test on physical device (simulator may have issues)

### Map Not Loading
- Check network connection
- Verify MapKit framework linked
- Check location services enabled

## Security Notes

⚠️ **Never commit these to version control:**
- Client Secret
- API keys
- Database credentials
- Encryption keys
- JWT secrets

✅ **Safe to commit:**
- Client ID (public)
- Redirect URI
- App configuration structure
- Mock data

## Next Steps

1. [ ] Configure Spotify Developer credentials
2. [ ] Test authentication flow
3. [ ] Plan backend architecture
4. [ ] Design database schema
5. [ ] Implement production API calls
6. [ ] Add analytics
7. [ ] Set up CI/CD
8. [ ] Prepare for App Store
