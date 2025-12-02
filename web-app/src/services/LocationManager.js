// Location Manager using browser Geolocation API
import { Location } from '../models';

class LocationManager {
  constructor() {
    this.currentLocation = null;
    this.watchId = null;
    this.locationCallbacks = [];
  }

  // Check if geolocation is supported
  get isSupported() {
    return 'geolocation' in navigator;
  }

  // Request location permissions and start tracking
  async requestLocation() {
    if (!this.isSupported) {
      throw new Error('Geolocation is not supported by this browser');
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const city = await this.getCityName(latitude, longitude);
          this.currentLocation = new Location(latitude, longitude, city);
          resolve(this.currentLocation);
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  }

  // Start watching location changes
  startWatchingLocation(callback) {
    if (!this.isSupported) {
      return;
    }

    this.locationCallbacks.push(callback);

    if (!this.watchId) {
      this.watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const city = await this.getCityName(latitude, longitude);
          this.currentLocation = new Location(latitude, longitude, city);
          
          // Notify all callbacks
          this.locationCallbacks.forEach(cb => cb(this.currentLocation));
        },
        (error) => {
          console.error('Location watch error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 30000
        }
      );
    }
  }

  // Stop watching location
  stopWatchingLocation() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
      this.locationCallbacks = [];
    }
  }

  // Get city name from coordinates using reverse geocoding
  async getCityName(latitude, longitude) {
    try {
      // Using Nominatim (OpenStreetMap) reverse geocoding API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
      );
      
      if (response.ok) {
        const data = await response.json();
        return data.address?.city || data.address?.town || data.address?.village || 'Unknown';
      }
    } catch (error) {
      console.error('Error fetching city name:', error);
    }
    return null;
  }

  // Calculate distance between two coordinates in meters
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}

const locationManager = new LocationManager();
export default locationManager;
