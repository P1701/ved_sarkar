// Data models for Hearby web app

// User Model
export class User {
  constructor(id, displayName, spotifyId = null, currentTrack = null, location = null) {
    this.id = id;
    this.displayName = displayName;
    this.spotifyId = spotifyId;
    this.currentTrack = currentTrack;
    this.location = location;
    this.lastUpdated = new Date();
  }
}

// Location Model
export class Location {
  constructor(latitude, longitude, city = null) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.city = city;
  }

  get coordinate() {
    return {
      lat: this.latitude,
      lng: this.longitude
    };
  }
}

// Track Model
export class Track {
  constructor(id, name, artist, albumName = null, albumImageUrl = null, duration = 0, isPlaying = false) {
    this.id = id;
    this.name = name;
    this.artist = artist;
    this.albumName = albumName;
    this.albumImageUrl = albumImageUrl;
    this.duration = duration; // in milliseconds
    this.isPlaying = isPlaying;
  }
}

// Nearby Listener Model
export class NearbyListener {
  constructor(user, distance) {
    this.id = user.id;
    this.user = user;
    this.distance = distance; // in meters
  }
}
