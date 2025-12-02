import Foundation
import UIKit

// MARK: - Spotify Manager
class SpotifyManager {
    static let shared = SpotifyManager()
    
    // Spotify API Credentials (These should be configured by the user)
    private let clientId = "YOUR_SPOTIFY_CLIENT_ID"
    private let redirectUri = "hearby://spotify-callback"
    private let scopes = "user-read-currently-playing user-read-playback-state"
    
    private var accessToken: String?
    private var refreshToken: String?
    private var tokenExpirationDate: Date?
    
    var isAuthenticated: Bool {
        guard let token = accessToken, let expiration = tokenExpirationDate else {
            return false
        }
        return Date() < expiration
    }
    
    private init() {
        // Load saved tokens
        loadTokens()
    }
    
    // MARK: - Authentication
    
    func authenticate(from viewController: UIViewController) {
        let authUrl = buildAuthURL()
        guard let url = URL(string: authUrl) else { return }
        
        if #available(iOS 10.0, *) {
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
        } else {
            UIApplication.shared.openURL(url)
        }
    }
    
    private func buildAuthURL() -> String {
        let baseUrl = "https://accounts.spotify.com/authorize"
        let params = [
            "client_id": clientId,
            "response_type": "code",
            "redirect_uri": redirectUri,
            "scope": scopes
        ]
        
        let queryString = params.map { "\($0.key)=\($0.value.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? "")" }
            .joined(separator: "&")
        
        return "\(baseUrl)?\(queryString)"
    }
    
    func handleAuthCallback(url: URL) {
        guard let components = URLComponents(url: url, resolvingAgainstBaseURL: false),
              let code = components.queryItems?.first(where: { $0.name == "code" })?.value else {
            return
        }
        
        exchangeCodeForToken(code: code)
    }
    
    private func exchangeCodeForToken(code: String) {
        // In a production app, this should be done through a secure backend
        // For now, this is a mock implementation
        
        // Mock token exchange
        self.accessToken = "mock_access_token_\(UUID().uuidString)"
        self.refreshToken = "mock_refresh_token_\(UUID().uuidString)"
        self.tokenExpirationDate = Date().addingTimeInterval(3600) // 1 hour
        
        saveTokens()
        
        // Notify that authentication succeeded
        NotificationCenter.default.post(name: .spotifyAuthenticationSucceeded, object: nil)
    }
    
    // MARK: - Playback Data
    
    func getCurrentlyPlaying(completion: @escaping (Track?) -> Void) {
        guard isAuthenticated else {
            completion(nil)
            return
        }
        
        // Mock implementation - In production, this would call Spotify API
        // https://api.spotify.com/v1/me/player/currently-playing
        
        // For demonstration, return a mock track
        let mockTrack = Track(
            id: "mock_track_id",
            name: "Sample Song",
            artist: "Sample Artist",
            albumName: "Sample Album",
            albumImageUrl: nil,
            duration: 240000,
            isPlaying: true
        )
        
        completion(mockTrack)
    }
    
    // MARK: - Token Persistence
    
    private func saveTokens() {
        UserDefaults.standard.set(accessToken, forKey: "spotify_access_token")
        UserDefaults.standard.set(refreshToken, forKey: "spotify_refresh_token")
        UserDefaults.standard.set(tokenExpirationDate, forKey: "spotify_token_expiration")
    }
    
    private func loadTokens() {
        accessToken = UserDefaults.standard.string(forKey: "spotify_access_token")
        refreshToken = UserDefaults.standard.string(forKey: "spotify_refresh_token")
        tokenExpirationDate = UserDefaults.standard.object(forKey: "spotify_token_expiration") as? Date
    }
    
    func logout() {
        accessToken = nil
        refreshToken = nil
        tokenExpirationDate = nil
        
        UserDefaults.standard.removeObject(forKey: "spotify_access_token")
        UserDefaults.standard.removeObject(forKey: "spotify_refresh_token")
        UserDefaults.standard.removeObject(forKey: "spotify_token_expiration")
    }
}

// MARK: - Notifications
extension Notification.Name {
    static let spotifyAuthenticationSucceeded = Notification.Name("spotifyAuthenticationSucceeded")
}
