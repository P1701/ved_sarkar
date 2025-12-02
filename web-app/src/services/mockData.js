

export const MOCK_USER = {
    id: 'current-user',
    displayName: 'You',
    username: 'demo_user',
    location: { latitude: 37.8715, longitude: -122.2730, city: 'Berkeley' } // Downtown Berkeley
};

export const MOCK_LISTENERS = [
    {
        id: 1,
        displayName: "Sarah M.",
        username: "sarah_m",
        isFriend: true,
        zoneId: "downtown",
        location: {
            latitude: 37.8715,
            longitude: -122.2730,
            city: "Berkeley"
        },
        track: {
            name: "Espresso",
            artist: "Sabrina Carpenter",
            albumArt: "https://picsum.photos/seed/espresso/200"
        }
    },
    {
        id: 2,
        displayName: "Mike J.",
        username: "mike_j",
        isFriend: false,
        zoneId: "downtown",
        location: {
            latitude: 37.8720,
            longitude: -122.2740,
            city: "Berkeley"
        },
        track: {
            name: "Not Like Us",
            artist: "Kendrick Lamar",
            albumArt: "https://picsum.photos/seed/notlikeus/200"
        }
    },
    {
        id: 3,
        displayName: "Emma L.",
        username: "emma_l",
        isFriend: true,
        zoneId: "campus",
        location: {
            latitude: 37.8750,
            longitude: -122.2580,
            city: "Berkeley"
        },
        track: {
            name: "BIRDS OF A FEATHER",
            artist: "Billie Eilish",
            albumArt: "https://picsum.photos/seed/birds/200"
        }
    },
    {
        id: 4,
        displayName: "Alex R.",
        username: "alex_r",
        isFriend: false,
        zoneId: "campus",
        location: {
            latitude: 37.8740,
            longitude: -122.2590,
            city: "Berkeley"
        },
        track: {
            name: "Good Luck, Babe!",
            artist: "Chappell Roan",
            albumArt: "https://picsum.photos/seed/goodluck/200"
        }
    },
    {
        id: 5,
        displayName: "David K.",
        username: "david_k",
        isFriend: false,
        zoneId: "north",
        location: {
            latitude: 37.8780,
            longitude: -122.2700,
            city: "Berkeley"
        },
        track: {
            name: "A Bar Song (Tipsy)",
            artist: "Shaboozey",
            albumArt: "https://picsum.photos/seed/tipsy/200"
        }
    },
    {
        id: 6,
        displayName: "Jessica T.",
        username: "jess_t",
        isFriend: false,
        zoneId: "south",
        location: {
            latitude: 37.8650,
            longitude: -122.2600,
            city: "Berkeley"
        },
        track: {
            name: "Million Dollar Baby",
            artist: "Tommy Richman",
            albumArt: "https://picsum.photos/seed/million/200"
        }
    },
    {
        id: 7,
        displayName: "Ryan P.",
        username: "ryan_p",
        isFriend: false,
        zoneId: "downtown",
        location: {
            latitude: 37.8705,
            longitude: -122.2690,
            city: "Berkeley"
        },
        track: {
            name: "I Had Some Help",
            artist: "Post Malone",
            albumArt: "https://picsum.photos/seed/help/200"
        }
    },
    {
        id: 8,
        displayName: "Chloe B.",
        username: "chloe_b",
        isFriend: true,
        zoneId: "north",
        location: {
            latitude: 37.8800,
            longitude: -122.2750,
            city: "Berkeley"
        },
        track: {
            name: "Too Sweet",
            artist: "Hozier",
            albumArt: "https://picsum.photos/seed/sweet/200"
        }
    },
    {
        id: 9,
        displayName: "Sam W.",
        username: "sam_w",
        isFriend: false,
        zoneId: "campus",
        location: {
            latitude: 37.8730,
            longitude: -122.2620,
            city: "Berkeley"
        },
        track: {
            name: "Beautiful Things",
            artist: "Benson Boone",
            albumArt: "https://picsum.photos/seed/beautiful/200"
        }
    },
    {
        id: 10,
        displayName: "Maya S.",
        username: "maya_s",
        isFriend: false,
        zoneId: "south",
        location: {
            latitude: 37.8630,
            longitude: -122.2580,
            city: "Berkeley"
        },
        track: {
            name: "Lunch",
            artist: "Billie Eilish",
            albumArt: "https://picsum.photos/seed/lunch/200"
        }
    },
    {
        id: 11,
        displayName: "Jordan L.",
        username: "jordan_l",
        isFriend: false,
        zoneId: "downtown",
        location: {
            latitude: 37.8695,
            longitude: -122.2710,
            city: "Berkeley"
        },
        track: {
            name: "Fortnight",
            artist: "Taylor Swift",
            albumArt: "https://picsum.photos/seed/fortnight/200"
        }
    },
    {
        id: 12,
        displayName: "Kevin H.",
        username: "kevin_h",
        isFriend: true,
        zoneId: "campus",
        location: {
            latitude: 37.8760,
            longitude: -122.2610,
            city: "Berkeley"
        },
        track: {
            name: "Pink Pony Club",
            artist: "Chappell Roan",
            albumArt: "https://picsum.photos/seed/pinkpony/200"
        }
    }
];

export const MOCK_FRIENDS = [
    { id: '1', displayName: 'Sarah M.', username: 'sarah_spotify', isOnline: true },
    { id: '3', displayName: 'Emma L.', username: 'emma_spotify', isOnline: true },
    { id: '6', displayName: 'David K.', username: 'david_k', isOnline: false },
    { id: '7', displayName: 'Lisa P.', username: 'lisa_p', isOnline: false },
];

export const MOCK_ROOMS = [
    {
        id: 'room1',
        name: 'Marina Chill',
        participants: 12,
        currentTrack: {
            name: 'Passionfruit',
            artist: 'Drake',
            albumArt: 'https://picsum.photos/seed/passionfruit/200'
        }
    },
    {
        id: 'room2',
        name: 'Cal Study Vibes',
        participants: 8,
        currentTrack: {
            name: 'Lo-Fi Beats',
            artist: 'Unknown',
            albumArt: 'https://picsum.photos/seed/lofi/200'
        }
    },
    {
        id: 'room3',
        name: 'Telegraph Ave Hits',
        participants: 25,
        currentTrack: {
            name: 'Cruel Summer',
            artist: 'Taylor Swift',
            albumArt: 'https://picsum.photos/seed/cruel/200'
        }
    }
];
