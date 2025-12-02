import Foundation
import CoreLocation

// MARK: - User Model
struct User: Codable {
    let id: String
    let displayName: String
    let spotifyId: String?
    var currentTrack: Track?
    var location: Location?
    var lastUpdated: Date
    
    init(id: String, displayName: String, spotifyId: String? = nil, currentTrack: Track? = nil, location: Location? = nil) {
        self.id = id
        self.displayName = displayName
        self.spotifyId = spotifyId
        self.currentTrack = currentTrack
        self.location = location
        self.lastUpdated = Date()
    }
}

// MARK: - Location Model
struct Location: Codable {
    let latitude: Double
    let longitude: Double
    let city: String?
    
    var coordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    }
    
    init(latitude: Double, longitude: Double, city: String? = nil) {
        self.latitude = latitude
        self.longitude = longitude
        self.city = city
    }
    
    init(coordinate: CLLocationCoordinate2D, city: String? = nil) {
        self.latitude = coordinate.latitude
        self.longitude = coordinate.longitude
        self.city = city
    }
}

// MARK: - Track Model
struct Track: Codable {
    let id: String
    let name: String
    let artist: String
    let albumName: String?
    let albumImageUrl: String?
    let duration: Int // in milliseconds
    let isPlaying: Bool
    
    init(id: String, name: String, artist: String, albumName: String? = nil, albumImageUrl: String? = nil, duration: Int = 0, isPlaying: Bool = false) {
        self.id = id
        self.name = name
        self.artist = artist
        self.albumName = albumName
        self.albumImageUrl = albumImageUrl
        self.duration = duration
        self.isPlaying = isPlaying
    }
}

// MARK: - Nearby Listener Model
struct NearbyListener: Identifiable {
    let id: String
    let user: User
    let distance: Double // in meters
    
    init(user: User, distance: Double) {
        self.id = user.id
        self.user = user
        self.distance = distance
    }
}
