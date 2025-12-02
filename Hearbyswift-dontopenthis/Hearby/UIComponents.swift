import UIKit

// MARK: - Current Track View
class CurrentTrackView: UIView {
    
    private let containerView: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBackground
        view.layer.cornerRadius = 16
        view.layer.shadowColor = UIColor.black.cgColor
        view.layer.shadowOpacity = 0.15
        view.layer.shadowOffset = CGSize(width: 0, height: 2)
        view.layer.shadowRadius = 8
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    private let musicIconView: UIImageView = {
        let imageView = UIImageView()
        imageView.image = UIImage(systemName: "music.note")
        imageView.tintColor = .systemGreen
        imageView.contentMode = .scaleAspectFit
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    private let trackNameLabel: UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 16, weight: .semibold)
        label.textColor = .label
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let artistNameLabel: UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 14, weight: .regular)
        label.textColor = .secondaryLabel
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let statusLabel: UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 12, weight: .regular)
        label.textColor = .tertiaryLabel
        label.text = "Not playing"
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupUI()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupUI()
    }
    
    private func setupUI() {
        backgroundColor = .clear
        
        addSubview(containerView)
        containerView.addSubview(musicIconView)
        containerView.addSubview(trackNameLabel)
        containerView.addSubview(artistNameLabel)
        containerView.addSubview(statusLabel)
        
        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: topAnchor),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),
            
            musicIconView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor, constant: 16),
            musicIconView.centerYAnchor.constraint(equalTo: containerView.centerYAnchor),
            musicIconView.widthAnchor.constraint(equalToConstant: 40),
            musicIconView.heightAnchor.constraint(equalToConstant: 40),
            
            trackNameLabel.topAnchor.constraint(equalTo: containerView.topAnchor, constant: 12),
            trackNameLabel.leadingAnchor.constraint(equalTo: musicIconView.trailingAnchor, constant: 12),
            trackNameLabel.trailingAnchor.constraint(equalTo: containerView.trailingAnchor, constant: -16),
            
            artistNameLabel.topAnchor.constraint(equalTo: trackNameLabel.bottomAnchor, constant: 4),
            artistNameLabel.leadingAnchor.constraint(equalTo: trackNameLabel.leadingAnchor),
            artistNameLabel.trailingAnchor.constraint(equalTo: trackNameLabel.trailingAnchor),
            
            statusLabel.topAnchor.constraint(equalTo: artistNameLabel.bottomAnchor, constant: 4),
            statusLabel.leadingAnchor.constraint(equalTo: trackNameLabel.leadingAnchor),
            statusLabel.trailingAnchor.constraint(equalTo: trackNameLabel.trailingAnchor)
        ])
    }
    
    func configure(with track: Track?) {
        if let track = track {
            trackNameLabel.text = track.name
            artistNameLabel.text = track.artist
            statusLabel.text = track.isPlaying ? "Now playing" : "Paused"
            musicIconView.tintColor = track.isPlaying ? .systemGreen : .systemGray
        } else {
            trackNameLabel.text = "No track playing"
            artistNameLabel.text = "Open Spotify to start listening"
            statusLabel.text = "Not playing"
            musicIconView.tintColor = .systemGray
        }
    }
}

// MARK: - Listener Callout View
class ListenerCalloutView: UIView {
    
    private let stackView: UIStackView = {
        let stack = UIStackView()
        stack.axis = .vertical
        stack.spacing = 4
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()
    
    private let trackLabel: UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 14, weight: .semibold)
        label.numberOfLines = 2
        return label
    }()
    
    private let artistLabel: UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 12, weight: .regular)
        label.textColor = .secondaryLabel
        label.numberOfLines = 1
        return label
    }()
    
    private let distanceLabel: UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 11, weight: .regular)
        label.textColor = .tertiaryLabel
        return label
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupUI()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupUI()
    }
    
    private func setupUI() {
        addSubview(stackView)
        
        stackView.addArrangedSubview(trackLabel)
        stackView.addArrangedSubview(artistLabel)
        stackView.addArrangedSubview(distanceLabel)
        
        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: topAnchor, constant: 8),
            stackView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 8),
            stackView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -8),
            stackView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -8),
            
            widthAnchor.constraint(equalToConstant: 200)
        ])
    }
    
    func configure(with listener: NearbyListener) {
        if let track = listener.user.currentTrack {
            trackLabel.text = "🎵 \(track.name)"
            artistLabel.text = track.artist
        } else {
            trackLabel.text = "Not playing"
            artistLabel.text = ""
        }
        
        let distanceInMeters = listener.distance
        if distanceInMeters < 1000 {
            distanceLabel.text = "📍 \(Int(distanceInMeters))m away"
        } else {
            distanceLabel.text = "📍 \(String(format: "%.1f", distanceInMeters / 1000))km away"
        }
    }
}
