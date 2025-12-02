import UIKit
import MapKit
import CoreLocation

class MapViewController: UIViewController {
    
    private var mapView: MKMapView!
    private var currentLocationButton: UIButton!
    private var currentTrackView: CurrentTrackView!
    
    private var nearbyListeners: [NearbyListener] = []
    private var updateTimer: Timer?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        setupMapView()
        setupLocationServices()
        setupNavigationBar()
        startPeriodicUpdates()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        updateCurrentTrack()
    }
    
    private func setupUI() {
        view.backgroundColor = .systemBackground
        
        // Setup Map View
        mapView = MKMapView()
        mapView.translatesAutoresizingMaskIntoConstraints = false
        mapView.showsUserLocation = true
        mapView.delegate = self
        
        // Use OpenStreetMap style (standard map type is closest to OSM in iOS)
        mapView.mapType = .standard
        mapView.showsCompass = true
        mapView.showsScale = true
        
        view.addSubview(mapView)
        
        // Setup Current Track View
        currentTrackView = CurrentTrackView()
        currentTrackView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(currentTrackView)
        
        // Setup Current Location Button
        currentLocationButton = UIButton(type: .system)
        currentLocationButton.setImage(UIImage(systemName: "location.fill"), for: .normal)
        currentLocationButton.backgroundColor = .systemBackground
        currentLocationButton.tintColor = .systemBlue
        currentLocationButton.layer.cornerRadius = 25
        currentLocationButton.layer.shadowColor = UIColor.black.cgColor
        currentLocationButton.layer.shadowOpacity = 0.2
        currentLocationButton.layer.shadowOffset = CGSize(width: 0, height: 2)
        currentLocationButton.layer.shadowRadius = 4
        currentLocationButton.translatesAutoresizingMaskIntoConstraints = false
        currentLocationButton.addTarget(self, action: #selector(centerOnUserLocation), for: .touchUpInside)
        view.addSubview(currentLocationButton)
        
        // Layout Constraints
        NSLayoutConstraint.activate([
            mapView.topAnchor.constraint(equalTo: view.topAnchor),
            mapView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            mapView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            mapView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            
            currentTrackView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            currentTrackView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            currentTrackView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -16),
            currentTrackView.heightAnchor.constraint(equalToConstant: 80),
            
            currentLocationButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            currentLocationButton.bottomAnchor.constraint(equalTo: currentTrackView.topAnchor, constant: -16),
            currentLocationButton.widthAnchor.constraint(equalToConstant: 50),
            currentLocationButton.heightAnchor.constraint(equalToConstant: 50)
        ])
    }
    
    private func setupMapView() {
        // Set initial region (will be updated when location is available)
        let initialRegion = MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194), // San Francisco
            span: MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05)
        )
        mapView.setRegion(initialRegion, animated: false)
    }
    
    private func setupLocationServices() {
        let locationManager = LocationManager.shared
        
        if locationManager.authorizationStatus == .notDetermined {
            locationManager.requestLocationPermission()
        } else if locationManager.authorizationStatus == .authorizedWhenInUse ||
                  locationManager.authorizationStatus == .authorizedAlways {
            locationManager.startUpdatingLocation()
        }
        
        // Observe location updates
        if let location = locationManager.currentLocation {
            centerMapOn(location: location.coordinate)
        }
    }
    
    private func setupNavigationBar() {
        title = "Hearby"
        
        let settingsButton = UIBarButtonItem(
            image: UIImage(systemName: "gearshape"),
            style: .plain,
            target: self,
            action: #selector(settingsButtonTapped)
        )
        navigationItem.rightBarButtonItem = settingsButton
    }
    
    @objc private func centerOnUserLocation() {
        guard let location = LocationManager.shared.currentLocation else {
            return
        }
        centerMapOn(location: location.coordinate)
    }
    
    private func centerMapOn(location: CLLocationCoordinate2D) {
        let region = MKCoordinateRegion(
            center: location,
            span: MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05)
        )
        mapView.setRegion(region, animated: true)
    }
    
    @objc private func settingsButtonTapped() {
        let alert = UIAlertController(
            title: "Settings",
            message: "Would you like to disconnect from Spotify?",
            preferredStyle: .actionSheet
        )
        
        alert.addAction(UIAlertAction(title: "Disconnect", style: .destructive) { [weak self] _ in
            self?.disconnectSpotify()
        })
        
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel))
        
        present(alert, animated: true)
    }
    
    private func disconnectSpotify() {
        SpotifyManager.shared.logout()
        let authVC = SpotifyAuthViewController()
        navigationController?.setViewControllers([authVC], animated: true)
    }
    
    // MARK: - Spotify Integration
    
    private func updateCurrentTrack() {
        SpotifyManager.shared.getCurrentlyPlaying { [weak self] track in
            DispatchQueue.main.async {
                self?.currentTrackView.configure(with: track)
            }
        }
    }
    
    private func startPeriodicUpdates() {
        updateTimer = Timer.scheduledTimer(withTimeInterval: 30.0, repeats: true) { [weak self] _ in
            self?.updateCurrentTrack()
            self?.updateNearbyListeners()
        }
    }
    
    // MARK: - Nearby Listeners
    
    private func updateNearbyListeners() {
        // Mock implementation - In production, this would fetch from a backend
        guard let currentLocation = LocationManager.shared.currentLocation else {
            return
        }
        
        // Create mock nearby listeners for demonstration
        let mockListeners = createMockNearbyListeners(around: currentLocation)
        
        nearbyListeners = mockListeners
        updateMapAnnotations()
    }
    
    private func createMockNearbyListeners(around location: CLLocation) -> [NearbyListener] {
        let mockTracks = [
            Track(id: "1", name: "Bohemian Rhapsody", artist: "Queen", isPlaying: true),
            Track(id: "2", name: "Hotel California", artist: "Eagles", isPlaying: true),
            Track(id: "3", name: "Stairway to Heaven", artist: "Led Zeppelin", isPlaying: true)
        ]
        
        var listeners: [NearbyListener] = []
        
        for i in 0..<3 {
            // Create locations within ~500m radius
            let latOffset = Double.random(in: -0.005...0.005)
            let lonOffset = Double.random(in: -0.005...0.005)
            
            let listenerLocation = Location(
                latitude: location.coordinate.latitude + latOffset,
                longitude: location.coordinate.longitude + lonOffset,
                city: LocationManager.shared.currentCity
            )
            
            let user = User(
                id: "user_\(i)",
                displayName: "Music Fan \(i + 1)",
                spotifyId: "spotify_\(i)",
                currentTrack: mockTracks[i],
                location: listenerLocation
            )
            
            let distance = location.distance(from: CLLocation(
                latitude: listenerLocation.latitude,
                longitude: listenerLocation.longitude
            ))
            
            listeners.append(NearbyListener(user: user, distance: distance))
        }
        
        return listeners
    }
    
    private func updateMapAnnotations() {
        // Remove old annotations
        let oldAnnotations = mapView.annotations.filter { !($0 is MKUserLocation) }
        mapView.removeAnnotations(oldAnnotations)
        
        // Add new annotations
        for listener in nearbyListeners {
            guard let location = listener.user.location else { continue }
            
            let annotation = ListenerAnnotation(listener: listener)
            annotation.coordinate = location.coordinate
            mapView.addAnnotation(annotation)
        }
    }
    
    deinit {
        updateTimer?.invalidate()
    }
}

// MARK: - MKMapViewDelegate
extension MapViewController: MKMapViewDelegate {
    func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
        guard let listenerAnnotation = annotation as? ListenerAnnotation else {
            return nil
        }
        
        let identifier = "ListenerAnnotation"
        var annotationView = mapView.dequeueReusableAnnotationView(withIdentifier: identifier) as? MKMarkerAnnotationView
        
        if annotationView == nil {
            annotationView = MKMarkerAnnotationView(annotation: annotation, reuseIdentifier: identifier)
            annotationView?.canShowCallout = true
        } else {
            annotationView?.annotation = annotation
        }
        
        annotationView?.markerTintColor = .systemGreen
        annotationView?.glyphImage = UIImage(systemName: "music.note")
        
        // Create callout view
        let calloutView = ListenerCalloutView()
        calloutView.configure(with: listenerAnnotation.listener)
        annotationView?.detailCalloutAccessoryView = calloutView
        
        return annotationView
    }
}

// MARK: - Listener Annotation
class ListenerAnnotation: NSObject, MKAnnotation {
    let listener: NearbyListener
    var coordinate: CLLocationCoordinate2D
    
    var title: String? {
        listener.user.displayName
    }
    
    var subtitle: String? {
        guard let track = listener.user.currentTrack else { return nil }
        return "\(track.name) - \(track.artist)"
    }
    
    init(listener: NearbyListener) {
        self.listener = listener
        self.coordinate = listener.user.location?.coordinate ?? CLLocationCoordinate2D()
        super.init()
    }
}
