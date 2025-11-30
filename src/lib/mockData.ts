export interface Car {
    id: string;
    name: string;
    type: 'sedan' | 'suv' | 'microbus' | 'luxury';
    price: number;
    image: string;
    images: string[];
    rating: number;
    trips: number;
    location: {
        lat: number;
        lng: number;
        address: string;
    };
    driver: {
        name: string;
        verified: boolean;
        phone: string; // Mock phone for WhatsApp
        joined: string;
        responseRate: string;
    };
    features: string[];
    description: string;
    unavailableDates: string[]; // ISO date strings
}

export const MOCK_CARS: Car[] = [
    {
        id: '1',
        name: 'Toyota Axio 2018',
        type: 'sedan',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200',
        images: [
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1580273916550-e323be2ed5d6?auto=format&fit=crop&q=80&w=1200'
        ],
        rating: 4.8,
        trips: 120,
        location: {
            lat: 23.8103,
            lng: 90.4125,
            address: 'Gulshan 1, Dhaka'
        },
        driver: {
            name: 'Rahim Uddin',
            verified: true,
            phone: '8801700000000',
            joined: 'Jan 2023',
            responseRate: '98%'
        },
        features: ['Air Conditioning', 'Bluetooth', 'Leather Seats', 'USB Charger', 'First Aid Kit'],
        description: 'Well maintained Toyota Axio 2018. Perfect for city rides and long distance trips. Chilled AC and comfortable seating.',
        unavailableDates: [
            '2025-11-28',
            '2025-11-29',
            '2025-12-05'
        ]
    },
    {
        id: '2',
        name: 'Toyota Noah 2015',
        type: 'microbus',
        price: 5000,
        image: 'https://images.unsplash.com/photo-1626859343951-276b6b6a4444?auto=format&fit=crop&q=80&w=1200',
        images: [
            'https://images.unsplash.com/photo-1626859343951-276b6b6a4444?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1626859343951-276b6b6a4444?auto=format&fit=crop&q=80&w=1200' // Duplicate for mock
        ],
        rating: 4.9,
        trips: 85,
        location: {
            lat: 23.7940,
            lng: 90.4043,
            address: 'Banani, Dhaka'
        },
        driver: {
            name: 'Karim Mia',
            verified: true,
            phone: '8801800000000',
            joined: 'Mar 2023',
            responseRate: '95%'
        },
        features: ['7 Seats', 'Dual AC', 'Roof Rack', 'Tinted Windows'],
        description: 'Spacious microbus for family trips. Can accommodate 7-8 people comfortably.',
        unavailableDates: []
    },
    {
        id: '3',
        name: 'Honda Vezel 2019',
        type: 'suv',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200',
        images: [
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200'
        ],
        rating: 4.7,
        trips: 45,
        location: {
            lat: 23.7461,
            lng: 90.3742,
            address: 'Dhanmondi, Dhaka'
        },
        driver: {
            name: 'Sajib Ahmed',
            verified: true,
            phone: '8801900000000',
            joined: 'Jun 2023',
            responseRate: '100%'
        },
        features: ['Hybrid', 'Sunroof', 'Premium Sound', 'Leather Interior'],
        description: 'Stylish and fuel efficient SUV. Great for both city and highway driving.',
        unavailableDates: ['2025-12-01', '2025-12-02']
    },
    {
        id: '4',
        name: 'Toyota Premio 2016',
        type: 'sedan',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=1200',
        images: [
            'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=1200'
        ],
        rating: 4.6,
        trips: 200,
        location: {
            lat: 23.8759,
            lng: 90.3795,
            address: 'Uttara, Dhaka'
        },
        driver: {
            name: 'Rafiqul Islam',
            verified: true,
            phone: '8801600000000',
            joined: 'Dec 2022',
            responseRate: '90%'
        },
        features: ['Comfort Suspension', 'Rear AC Vents', 'Spacious Legroom'],
        description: 'Premium sedan for a comfortable journey. Very clean and well maintained.',
        unavailableDates: []
    },
    {
        id: '5',
        name: 'Mitsubishi Pajero',
        type: 'luxury',
        price: 8000,
        image: 'https://images.unsplash.com/photo-1594502184342-28efcb0a5748?auto=format&fit=crop&q=80&w=1200',
        images: [
            'https://images.unsplash.com/photo-1594502184342-28efcb0a5748?auto=format&fit=crop&q=80&w=1200'
        ],
        rating: 5.0,
        trips: 15,
        location: {
            lat: 23.7634,
            lng: 90.4285,
            address: 'Rampura, Dhaka'
        },
        driver: {
            name: 'Tanvir Hasan',
            verified: true,
            phone: '8801500000000',
            joined: 'Aug 2023',
            responseRate: '99%'
        },
        features: ['4WD', 'Leather Seats', 'Sunroof', 'Premium Audio', '7 Seats'],
        description: 'Luxury SUV for special occasions or rough terrain. Top of the line features.',
        unavailableDates: ['2025-11-30']
    }
];

export const PENDING_DRIVERS = [
    {
        id: 'd1',
        name: 'Abdul Karim',
        appliedDate: '2025-11-25',
        status: 'pending',
        documents: {
            nid: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=600', // Mock ID card
            license: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=600', // Mock License
            car: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600'
        }
    },
    {
        id: 'd2',
        name: 'Jamal Hossain',
        appliedDate: '2025-11-24',
        status: 'pending',
        documents: {
            nid: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=600',
            license: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=600',
            car: 'https://images.unsplash.com/photo-1626859343951-276b6b6a4444?auto=format&fit=crop&q=80&w=600'
        }
    }
];
