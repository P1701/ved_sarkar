# Contributing to Hearby

Thank you for your interest in contributing to Hearby! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title**: Describe the issue briefly
- **Steps to reproduce**: Detailed steps to reproduce the behavior
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Screenshots**: If applicable
- **Environment**: iOS version, device/simulator, Xcode version
- **Logs**: Any relevant console output

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear title**: Describe the enhancement
- **Provide details**: Explain why this enhancement would be useful
- **Provide examples**: Show how the feature would work
- **Consider scope**: Keep suggestions focused and achievable

### Pull Requests

1. **Fork the repository**
2. **Create a branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the coding standards
4. **Test thoroughly**: Ensure all features work
5. **Commit**: `git commit -m 'Add amazing feature'`
6. **Push**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

## 📝 Coding Standards

### Swift Style Guide

Follow Apple's Swift API Design Guidelines:

#### Naming
```swift
// Good
func fetchNearbyListeners(within radius: Double)
var currentPlayingTrack: Track?

// Avoid
func getNearby(r: Double)
var curr_track: Track?
```

#### Code Organization
```swift
// MARK: - Section Name
class MyClass {
    // MARK: - Properties
    private var myProperty: String
    
    // MARK: - Initialization
    init() { }
    
    // MARK: - Public Methods
    func publicMethod() { }
    
    // MARK: - Private Methods
    private func privateMethod() { }
}
```

#### Comments
- Write self-documenting code
- Add comments for complex logic
- Use `// MARK:` for organization
- Document public APIs

```swift
/// Fetches nearby listeners within the specified radius
/// - Parameter radius: Search radius in meters
/// - Returns: Array of nearby listeners sorted by distance
func fetchNearbyListeners(within radius: Double) -> [NearbyListener]
```

### Project Structure

Keep files organized:
```
Hearby/
├── Models/         # Data models
├── Views/          # UI components
├── Controllers/    # View controllers
├── Managers/       # Service managers
├── Utilities/      # Helper functions
└── Resources/      # Assets, strings
```

### Git Commit Messages

Format:
```
<type>: <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

Example:
```
feat: Add real-time location updates

Implement WebSocket connection for receiving live location
updates from nearby users. Updates are throttled to prevent
excessive map redraws.

Closes #123
```

## 🧪 Testing

### Running Tests

```bash
# In Xcode
⌘ + U

# Or command line
xcodebuild test -scheme Hearby -destination 'platform=iOS Simulator,name=iPhone 14'
```

### Writing Tests

```swift
import XCTest
@testable import Hearby

class SpotifyManagerTests: XCTestCase {
    var sut: SpotifyManager!
    
    override func setUp() {
        super.setUp()
        sut = SpotifyManager.shared
    }
    
    func testAuthenticationFlow() {
        // Given
        let expectation = XCTestExpectation(description: "Auth completes")
        
        // When
        sut.authenticate(from: UIViewController())
        
        // Then
        // Add assertions
        wait(for: [expectation], timeout: 5.0)
    }
}
```

## 🎯 Priority Areas

### High Priority
1. **Real Spotify API Integration**: Replace mock with actual API calls
2. **Backend Service**: User discovery and location sharing
3. **Testing**: Comprehensive unit and integration tests
4. **UI Polish**: Animations, transitions, loading states

### Medium Priority
1. **Profile System**: User profiles and preferences
2. **Friend System**: Add and manage friends
3. **Push Notifications**: Notify when friends are nearby
4. **Settings**: Privacy controls, appearance options

### Low Priority
1. **Music Stats**: Listening history and analytics
2. **Social Features**: Like, comment, share
3. **Playlist Sharing**: Share playlists with nearby users
4. **Achievement System**: Badges for discoveries

## 🔒 Security Guidelines

### Do's
✅ Use HTTPS for all API calls
✅ Store tokens in Keychain (not UserDefaults)
✅ Validate all user input
✅ Implement certificate pinning
✅ Use secure random for tokens
✅ Follow OWASP Mobile Top 10

### Don'ts
❌ Commit API keys or secrets
❌ Store sensitive data in UserDefaults
❌ Log sensitive information
❌ Use weak encryption
❌ Trust client-side data
❌ Skip input validation

### Code Review Checklist

Before submitting PR:
- [ ] No hardcoded credentials
- [ ] Proper error handling
- [ ] Memory leaks checked
- [ ] Thread safety considered
- [ ] Accessibility labels added
- [ ] Works on iOS 14+
- [ ] Tested on device
- [ ] Documentation updated

## 📚 Resources

### Learning Resources
- [Swift Documentation](https://swift.org/documentation/)
- [iOS Development Guide](https://developer.apple.com/ios/)
- [MapKit Guide](https://developer.apple.com/documentation/mapkit)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)

### Tools
- **Xcode**: Primary IDE
- **Instruments**: Performance profiling
- **Swift Package Manager**: Dependencies
- **Git**: Version control

## 🎓 Development Setup

### Prerequisites
1. macOS 12.0+
2. Xcode 12.0+
3. Git
4. Spotify Developer Account (optional for development)

### Setup Steps
1. Clone repository
2. Open `Hearby.xcodeproj`
3. Build and run
4. Make changes
5. Test thoroughly
6. Submit PR

## 💬 Communication

### Questions?
- Open a Discussion on GitHub
- Tag issues with `question` label
- Check existing documentation

### Feature Proposals
- Open an issue with `enhancement` label
- Provide detailed description
- Wait for feedback before implementing

## 🏆 Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Appreciated by the community!

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Every contribution, no matter how small, helps make Hearby better. We appreciate your time and effort!

---

**Happy Coding! 🎵**
