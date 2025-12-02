import { MOCK_USER } from './mockData';

class SpotifyManager {
  constructor() {
    this.token = localStorage.getItem('spotify_token');
  }

  isAuthenticated() {
    return !!this.token;
  }

  login() {
    return Promise.resolve();
  }

  logout() {
    localStorage.removeItem('spotify_token');
    window.location.reload();
  }

  async getUserProfile() {
    return Promise.resolve(MOCK_USER);
  }

  async getCurrentlyPlaying() {
    return Promise.resolve({
      name: 'Midnight City',
      artist: 'M83',
      album: 'Hurry Up, We\'re Dreaming',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b273199e46645396e57d59858342',
      isPlaying: true
    });
  }
}

const spotifyManager = new SpotifyManager();
export default spotifyManager;
