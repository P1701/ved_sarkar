import { MOCK_USER } from './mockData';

class LocationManager {
  constructor() {
    this.watchId = null;
  }

  requestLocation() {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        resolve({
          latitude: MOCK_USER.location.latitude,
          longitude: MOCK_USER.location.longitude,
          city: MOCK_USER.location.city
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: 'Current Location'
          });
        },
        (error) => {
          resolve({
            latitude: MOCK_USER.location.latitude,
            longitude: MOCK_USER.location.longitude,
            city: MOCK_USER.location.city
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    });
  }

  startWatchingLocation(callback) {
    callback({
      latitude: MOCK_USER.location.latitude,
      longitude: MOCK_USER.location.longitude,
      city: MOCK_USER.location.city
    });
  }

  stopWatchingLocation() {
    if (this.watchId) {
      clearInterval(this.watchId);
      this.watchId = null;
    }
  }
}

const locationManager = new LocationManager();
export default locationManager;
