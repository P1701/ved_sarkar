# Hearby Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- macOS with Xcode 12+ installed
- iOS Simulator or iPhone running iOS 14+
- Spotify account (free or premium)

### Step 1: Clone the Repository
```bash
git clone https://github.com/jthibault03/hearby.git
cd hearby
```

### Step 2: Open the Project
```bash
open Hearby/Hearby.xcodeproj
```

Or in Xcode:
- File → Open
- Navigate to `hearby/Hearby/Hearby.xcodeproj`
- Click Open

### Step 3: Select Target
- In Xcode, at the top left, select a simulator (e.g., iPhone 14 Pro)
- Or connect a physical device

### Step 4: Build and Run
- Press `⌘ + R` or click the Play button
- Wait for the build to complete
- The app will launch in the simulator

### Step 5: First Launch Experience

#### Screen 1: Spotify Authentication
You'll see:
- 🎵 Hearby logo
- Description text
- "Connect with Spotify" button

**Note**: Currently uses mock authentication
- Tap "Connect with Spotify"
- You'll be automatically logged in (mock)

#### Screen 2: Main Map View
After authentication, you'll see:
- Interactive map centered on San Francisco (default location)
- Your location button (🎯 icon) in bottom right
- Current track widget at the bottom
- Navigation bar with "Hearby" title and settings gear icon

### Step 6: Exploring Features

#### Grant Location Permission
When prompted:
1. Tap "Allow While Using App"
2. The map will center on your location
3. Nearby listeners will appear as green music note pins

#### View Nearby Listeners
- Green pins represent mock nearby users
- Tap any pin to see:
  - User's name
  - Currently playing track
  - Distance from you

#### Current Track Widget
At the bottom of the screen:
- Shows your "currently playing" track (mock data)
- Displays track name, artist, and status

#### Settings
Tap the gear icon (⚙️) in the top right:
- Option to disconnect from Spotify
- Returns to authentication screen

### Step 7: Testing with Simulator

#### Change Location in Simulator
1. In iOS Simulator menu: Debug → Location
2. Select a location (e.g., "Apple", "City Run")
3. Watch the map update to new location

#### Mock Data
The app currently shows:
- Mock Spotify track: "Sample Song" by "Sample Artist"
- Three mock nearby listeners
- Random locations within 500m radius

## 🎯 What You Should See

### Authentication Screen
```
┌─────────────────────────┐
│                         │
│      🎵 Hearby         │
│                         │
│  Connect with nearby    │
│  music listeners        │
│  Share what you're      │
│  listening to on Spotify│
│                         │
│  ┌──────────────────┐  │
│  │ Connect Spotify  │  │
│  └──────────────────┘  │
│                         │
└─────────────────────────┘
```

### Main Map Screen
```
┌─────────────────────────┐
│ ← Hearby           ⚙️   │
├─────────────────────────┤
│                         │
│   🗺️  Map View         │
│                         │
│   📍 Your Location     │
│   🎵 Nearby Listener 1 │
│   🎵 Nearby Listener 2 │
│   🎵 Nearby Listener 3 │
│                         │
│                    🎯   │
│                         │
├─────────────────────────┤
│ 🎵 Sample Song          │
│    Sample Artist        │
│    Now playing          │
└─────────────────────────┘
```

## 🔧 Common Issues & Solutions

### Issue: Xcode Not Found
**Solution**: Install Xcode from Mac App Store

### Issue: Build Errors
**Solution**: 
1. Clean build folder: `⌘ + Shift + K`
2. Rebuild: `⌘ + B`

### Issue: Simulator Doesn't Show Location
**Solution**: 
1. Simulator → Debug → Location
2. Select "Apple" or custom location

### Issue: App Crashes on Launch
**Solution**:
1. Check iOS version is 14.0+
2. Clean derived data
3. Restart Xcode

### Issue: No Nearby Listeners
**Solution**: 
- This is normal! Mock data generates 3 listeners
- They appear within ~500m of your location
- Try zooming out on the map

## 📱 Testing on Physical Device

### Setup
1. Connect iPhone via USB
2. Select device in Xcode
3. Trust computer on iPhone
4. May need to add Apple ID to Xcode signing

### Running
1. Press `⌘ + R`
2. App installs on device
3. Test with real GPS location

### Features to Test
- ✅ Real location tracking
- ✅ Walking/moving updates map
- ✅ Location permission flow
- ✅ Performance on actual hardware

## 🎨 Customization

### Change App Icon
Currently no custom icon. To add:
1. Assets.xcassets → AppIcon
2. Add images at required sizes

### Change Color Scheme
Edit in view controllers:
- `.systemGreen` → your color
- `.systemBackground` → your background

### Adjust Map Style
In `MapViewController.swift`:
```swift
mapView.mapType = .standard  // or .satellite, .hybrid
```

## 🔐 Adding Real Spotify Integration

See `INTEGRATION.md` for detailed steps:
1. Get Spotify Developer credentials
2. Update `SpotifyManager.swift`
3. Implement real API calls
4. Test with your Spotify account

## 📚 Next Steps

1. ✅ App running successfully
2. 📖 Read `ARCHITECTURE.md` to understand code structure
3. 🔧 Read `INTEGRATION.md` for production setup
4. ⚙️ Read `CONFIGURATION.md` for config options
5. 🚀 Start customizing!

## 💡 Tips

- Use mock data for development
- Test location features on device
- Read inline code comments
- Check console for debug logs
- Explore the clean architecture

## 🆘 Getting Help

If you encounter issues:
1. Check this guide
2. Review error messages
3. Read documentation files
4. Check GitHub issues
5. Open a new issue with details

## 🎉 Success Checklist

- [ ] Cloned repository
- [ ] Opened in Xcode
- [ ] Built successfully
- [ ] Launched in simulator
- [ ] Saw authentication screen
- [ ] Connected to "Spotify" (mock)
- [ ] Saw map with location
- [ ] Granted location permission
- [ ] Saw nearby listeners
- [ ] Tapped on listener annotation
- [ ] Viewed track information
- [ ] Used current location button
- [ ] Opened settings menu

**Congratulations! You're ready to build the future of social music sharing! 🎵🎉**
