# Hearby API Integration Guide

## Overview

This guide explains how to integrate the real Spotify API and implement a backend service for the Hearby app.

## Spotify API Integration

### 1. Setting Up Spotify Developer Account

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URI: `hearby://spotify-callback`
4. Copy your Client ID and Client Secret

### 2. Update SpotifyManager.swift

Replace the mock implementation with real API calls:

```swift
private let clientId = "YOUR_ACTUAL_CLIENT_ID"
private let clientSecret = "YOUR_ACTUAL_CLIENT_SECRET"
```

### 3. Implementing Real API Calls

#### Get Currently Playing Track

```swift
func getCurrentlyPlaying(completion: @escaping (Track?) -> Void) {
    guard let accessToken = accessToken else {
        completion(nil)
        return
    }
    
    let url = URL(string: "https://api.spotify.com/v1/me/player/currently-playing")!
    var request = URLRequest(url: url)
    request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
    
    URLSession.shared.dataTask(with: request) { data, response, error in
        guard let data = data,
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let item = json["item"] as? [String: Any] else {
            completion(nil)
            return
        }
        
        let track = self.parseTrack(from: item)
        completion(track)
    }.resume()
}
```

### 4. Required Spotify Scopes

The app needs these permissions:
- `user-read-currently-playing`: Get the current playing track
- `user-read-playback-state`: Get playback state
- `user-read-private`: Access user profile
- `user-read-email`: Access user email

## Backend Service Architecture

### 1. User Location Service

You'll need a backend to handle:
- User registration and authentication
- Real-time location updates
- Nearby user discovery
- Privacy controls

### Recommended Stack

```
Backend: Node.js / Python / Go
Database: PostgreSQL with PostGIS for geospatial queries
Real-time: WebSocket or Server-Sent Events
Caching: Redis for performance
```

### 2. API Endpoints

#### POST /api/users/location
Update user's current location and track

```json
{
  "userId": "user123",
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "currentTrack": {
    "id": "track123",
    "name": "Song Name",
    "artist": "Artist Name"
  }
}
```

#### GET /api/users/nearby
Get nearby listeners

```
Query params:
- latitude: User's latitude
- longitude: User's longitude
- radius: Search radius in meters (default: 1000)

Response:
[
  {
    "user": {...},
    "distance": 245.5,
    "currentTrack": {...}
  }
]
```

### 3. Geospatial Query Example (PostgreSQL)

```sql
SELECT 
  u.id,
  u.display_name,
  u.current_track,
  ST_Distance(
    ST_MakePoint(u.longitude, u.latitude)::geography,
    ST_MakePoint($1, $2)::geography
  ) as distance
FROM users u
WHERE 
  ST_DWithin(
    ST_MakePoint(u.longitude, u.latitude)::geography,
    ST_MakePoint($1, $2)::geography,
    $3  -- radius in meters
  )
  AND u.id != $4  -- exclude current user
  AND u.current_track IS NOT NULL
ORDER BY distance
LIMIT 50;
```

### 4. Real-time Updates

Implement WebSocket for real-time updates:

```swift
class RealtimeService {
    private var webSocket: URLSessionWebSocketTask?
    
    func connect() {
        let url = URL(string: "wss://api.hearby.com/ws")!
        webSocket = URLSession.shared.webSocketTask(with: url)
        webSocket?.resume()
        receiveMessage()
    }
    
    func receiveMessage() {
        webSocket?.receive { [weak self] result in
            switch result {
            case .success(let message):
                // Handle nearby user updates
                self?.handleMessage(message)
                self?.receiveMessage()
            case .failure(let error):
                print("WebSocket error: \(error)")
            }
        }
    }
}
```

## Privacy & Security Considerations

### 1. Location Privacy

- Allow users to set visibility radius
- Implement "invisible mode"
- Show approximate location (not exact coordinates)
- Allow users to pause sharing

### 2. Data Protection

- Encrypt data in transit (HTTPS/WSS)
- Don't store sensitive Spotify data
- Implement data retention policies
- GDPR compliance for EU users

### 3. Rate Limiting

- Limit location updates (e.g., once per minute)
- Cache nearby queries
- Implement exponential backoff

## Testing

### 1. Mock Data for Development

The current implementation includes mock data. To test:

1. Run the app in simulator
2. Use simulated locations in Xcode
3. See mock nearby listeners appear

### 2. Integration Testing

Before production:
- Test with real Spotify accounts
- Verify location updates work on device
- Test various network conditions
- Verify privacy controls

## Deployment Checklist

- [ ] Set up production Spotify app credentials
- [ ] Deploy backend service
- [ ] Configure database with geospatial extensions
- [ ] Set up monitoring and logging
- [ ] Implement rate limiting
- [ ] Add crash reporting (e.g., Firebase Crashlytics)
- [ ] Add analytics
- [ ] Submit to App Store

## Additional Resources

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [iOS Location Best Practices](https://developer.apple.com/documentation/corelocation)
- [MapKit Documentation](https://developer.apple.com/documentation/mapkit)
- [PostGIS Documentation](https://postgis.net/documentation/)

## Support

For questions or issues during integration, please check:
1. Spotify API Status Page
2. GitHub Issues
3. Community Forums
