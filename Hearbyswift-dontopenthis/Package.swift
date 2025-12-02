// swift-tools-version:5.5
import PackageDescription

let package = Package(
    name: "Hearby",
    platforms: [
        .iOS(.v14)
    ],
    products: [
        .library(
            name: "Hearby",
            targets: ["Hearby"])
    ],
    dependencies: [
        // Add dependencies here if needed
        // For example: Spotify SDK, networking libraries, etc.
    ],
    targets: [
        .target(
            name: "Hearby",
            dependencies: []),
        .testTarget(
            name: "HearbyTests",
            dependencies: ["Hearby"])
    ]
)
