// Spotify Manager for web-based authentication
import { Track } from '../models';

class SpotifyManager {
  constructor() {
    // Spotify API Credentials (read from Create React App env vars)
    // Use `REACT_APP_` prefix so these are available in the browser bundle
    this.clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    this.redirectUri = process.env.REACT_APP_REDIRECT_URI;
    this.scopes = 'user-read-currently-playing user-read-playback-state';
    
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenExpirationDate = null;
    
    this.loadTokens();
  }

  get isAuthenticated() {
    if (!this.accessToken || !this.tokenExpirationDate) {
      return false;
    }
    return new Date() < new Date(this.tokenExpirationDate);
  }

  // PKCE helpers for secure web authentication
  generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  }

  async generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  async authenticate() {
    const codeVerifier = this.generateRandomString(64);
    sessionStorage.setItem('code_verifier', codeVerifier);
    
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    const params = {
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: this.redirectUri,
      scope: this.scopes,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    };
    
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }

  async handleAuthCallback(code) {
    const codeVerifier = sessionStorage.getItem('code_verifier');
    
    if (!codeVerifier) {
      throw new Error('Code verifier not found');
    }
    
    // In production, this should call your backend to exchange the code
    // For now, using mock implementation
    this.accessToken = `mock_access_token_${Date.now()}`;
    this.refreshToken = `mock_refresh_token_${Date.now()}`;
    this.tokenExpirationDate = new Date(Date.now() + 3600000).toISOString(); // 1 hour
    
    this.saveTokens();
    sessionStorage.removeItem('code_verifier');
    
    return true;
  }

  async getCurrentlyPlaying() {
    if (!this.isAuthenticated) {
      return null;
    }
    
    // Mock implementation - in production, call Spotify API
    // https://api.spotify.com/v1/me/player/currently-playing
    
    const mockTrack = new Track(
      'mock_track_id',
      'Blinding Lights',
      'The Weeknd',
      'After Hours',
      null,
      200040,
      true
    );
    
    return mockTrack;
  }

  saveTokens() {
    localStorage.setItem('spotify_access_token', this.accessToken);
    localStorage.setItem('spotify_refresh_token', this.refreshToken);
    localStorage.setItem('spotify_token_expiration', this.tokenExpirationDate);
  }

  loadTokens() {
    this.accessToken = localStorage.getItem('spotify_access_token');
    this.refreshToken = localStorage.getItem('spotify_refresh_token');
    this.tokenExpirationDate = localStorage.getItem('spotify_token_expiration');
  }

  logout() {
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenExpirationDate = null;
    
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expiration');
  }
}

const spotifyManager = new SpotifyManager();
export default spotifyManager;
