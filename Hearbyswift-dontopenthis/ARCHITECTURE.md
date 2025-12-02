# Hearby Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        iOS App (Hearby)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌─────────────────────┐       │
│  │  UI Layer        │         │  Managers Layer     │       │
│  ├──────────────────┤         ├─────────────────────┤       │
│  │ - MapViewController        │ - SpotifyManager    │       │
│  │ - SpotifyAuthVC  │         │ - LocationManager   │       │
│  │ - UIComponents   │         │                     │       │
│  └────────┬─────────┘         └──────────┬──────────┘       │
│           │                               │                  │
│           └───────────┬───────────────────┘                  │
│                       │                                      │
│  ┌────────────────────▼─────────────────────┐               │
│  │         Models & Business Logic           │              │
│  ├────────────────────────────────────────────┤              │
│  │ - User, Track, Location, NearbyListener   │              │
│  │ - Authentication State                     │              │
│  │ - Location Processing                      │              │
│  └────────────────────┬───────────────────────┘              │
│                       │                                      │
└───────────────────────┼──────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌─────────────┐
│   Spotify    │ │  CoreLocation│ │   MapKit    │
│   Web API    │ │   Framework  │ │  Framework  │
└──────────────┘ └──────────────┘ └─────────────┘
```

## Component Details

### 1. UI Layer

#### MapViewController
- **Responsibility**: Main app interface with map
- **Features**:
  - Display user location
  - Show nearby listeners as annotations
  - Handle user interactions
  - Update current track display
  
#### SpotifyAuthViewController
- **Responsibility**: Handle Spotify authentication
- **Features**:
  - OAuth flow initiation
  - Handle authentication callback
  - Navigate to main view on success

#### UIComponents
- **CurrentTrackView**: Display current playing track
- **ListenerCalloutView**: Show listener details on map

### 2. Managers Layer

#### SpotifyManager
- **Responsibility**: Manage Spotify integration
- **Functions**:
  - `authenticate()`: Start OAuth flow
  - `getCurrentlyPlaying()`: Fetch current track
  - `handleAuthCallback()`: Process OAuth callback
  - Token management and persistence

#### LocationManager
- **Responsibility**: Handle location services
- **Functions**:
  - Request location permissions
  - Track user location
  - Reverse geocoding for city names
  - Authorization state management

### 3. Models

```
User
├── id: String
├── displayName: String
├── spotifyId: String?
├── currentTrack: Track?
├── location: Location?
└── lastUpdated: Date

Track
├── id: String
├── name: String
├── artist: String
├── albumName: String?
├── albumImageUrl: String?
├── duration: Int
└── isPlaying: Bool

Location
├── latitude: Double
├── longitude: Double
└── city: String?

NearbyListener
├── id: String
├── user: User
└── distance: Double
```

## Data Flow

### Authentication Flow
```
1. User taps "Connect with Spotify"
   ↓
2. SpotifyManager.authenticate()
   ↓
3. Open Safari with Spotify OAuth URL
   ↓
4. User authenticates on Spotify
   ↓
5. Callback to hearby://spotify-callback
   ↓
6. AppDelegate receives URL
   ↓
7. SpotifyManager.handleAuthCallback()
   ↓
8. Exchange code for token (mock)
   ↓
9. Store token & notify success
   ↓
10. Navigate to MapViewController
```

### Location Update Flow
```
1. LocationManager requests permission
   ↓
2. User grants permission
   ↓
3. Start location updates
   ↓
4. Receive location from CoreLocation
   ↓
5. Update currentLocation property
   ↓
6. Reverse geocode for city name
   ↓
7. Update map center
   ↓
8. Trigger nearby listener update
```

### Track Display Flow
```
1. Timer triggers every 30s
   ↓
2. SpotifyManager.getCurrentlyPlaying()
   ↓
3. Fetch from Spotify API (mock)
   ↓
4. Return Track object
   ↓
5. Update CurrentTrackView
   ↓
6. Display track info to user
```

### Nearby Discovery Flow
```
1. Get current location
   ↓
2. Generate mock nearby listeners
   ↓
3. Calculate distances
   ↓
4. Create ListenerAnnotation objects
   ↓
5. Add annotations to map
   ↓
6. User taps annotation
   ↓
7. Show callout with track info
```

## Future Architecture (With Backend)

```
┌─────────────┐
│  iOS App    │
└──────┬──────┘
       │ REST API / WebSocket
       ▼
┌─────────────┐
│   Backend   │
│   Service   │
├─────────────┤
│ - REST API  │
│ - WebSocket │
│ - Auth      │
└──────┬──────┘
       │
   ┌───┴───┐
   ▼       ▼
┌─────┐ ┌────────┐
│ DB  │ │ Redis  │
│ +   │ │ Cache  │
│PostGIS│        │
└─────┘ └────────┘
```

### Backend Responsibilities (Future)
- User authentication & authorization
- Store user locations (with privacy controls)
- Geospatial queries for nearby users
- Real-time updates via WebSocket
- Rate limiting & security
- Analytics & monitoring

## Technology Stack

### iOS App
- **Language**: Swift 5+
- **UI Framework**: UIKit
- **Min iOS**: 14.0
- **Architecture**: MVC with Managers

### Frameworks
- **MapKit**: Map display
- **CoreLocation**: Location services
- **Foundation**: Core utilities
- **UIKit**: User interface

### External APIs
- **Spotify Web API**: Music data
- **Future**: Custom backend API

## Security Considerations

### Current Implementation
- OAuth tokens stored in UserDefaults (development)
- Location permissions properly requested
- No sensitive data in code

### Production Requirements
- Store tokens in Keychain
- Implement certificate pinning
- Add request signing
- Rate limit API calls
- Implement user privacy controls

## Performance Optimizations

### Current
- Location updates throttled to 100m
- Map annotations cached
- Timer-based updates (30s)

### Future
- Implement delta updates
- Add pagination for nearby users
- Cache API responses
- Optimize map rendering
- Background location updates

## Testing Strategy

### Unit Tests (To Add)
- Model encoding/decoding
- Manager logic
- Data transformations

### Integration Tests
- Spotify authentication flow
- Location services
- Map interactions

### UI Tests
- Authentication flow
- Map navigation
- Settings interactions
