import UIKit

class SpotifyAuthViewController: UIViewController {
    
    private let logoLabel: UILabel = {
        let label = UILabel()
        label.text = "🎵 Hearby"
        label.font = UIFont.systemFont(ofSize: 48, weight: .bold)
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let descriptionLabel: UILabel = {
        let label = UILabel()
        label.text = "Connect with nearby music listeners\nShare what you're listening to on Spotify"
        label.numberOfLines = 0
        label.textAlignment = .center
        label.font = UIFont.systemFont(ofSize: 16)
        label.textColor = .secondaryLabel
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let connectButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Connect with Spotify", for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 18, weight: .semibold)
        button.backgroundColor = .systemGreen
        button.setTitleColor(.white, for: .normal)
        button.layer.cornerRadius = 12
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        setupObservers()
    }
    
    private func setupUI() {
        view.backgroundColor = .systemBackground
        
        view.addSubview(logoLabel)
        view.addSubview(descriptionLabel)
        view.addSubview(connectButton)
        
        NSLayoutConstraint.activate([
            logoLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            logoLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor, constant: -100),
            
            descriptionLabel.topAnchor.constraint(equalTo: logoLabel.bottomAnchor, constant: 20),
            descriptionLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 40),
            descriptionLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -40),
            
            connectButton.topAnchor.constraint(equalTo: descriptionLabel.bottomAnchor, constant: 40),
            connectButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            connectButton.widthAnchor.constraint(equalToConstant: 250),
            connectButton.heightAnchor.constraint(equalToConstant: 50)
        ])
        
        connectButton.addTarget(self, action: #selector(connectButtonTapped), for: .touchUpInside)
    }
    
    private func setupObservers() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleAuthSuccess),
            name: .spotifyAuthenticationSucceeded,
            object: nil
        )
    }
    
    @objc private func connectButtonTapped() {
        SpotifyManager.shared.authenticate(from: self)
    }
    
    @objc private func handleAuthSuccess() {
        DispatchQueue.main.async { [weak self] in
            let mapVC = MapViewController()
            self?.navigationController?.setViewControllers([mapVC], animated: true)
        }
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}
