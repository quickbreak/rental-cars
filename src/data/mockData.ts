import { Car, Review } from '../types';

// Mock reviews for cars
const mockReviews: Review[] = [
  {
    id: 'review-1',
    userId: 'user-1',
    userName: 'Michael Johnson',
    carId: 'car-1',
    rating: 5,
    comment: 'Fantastic car! Clean, powerful, and a joy to drive. Will definitely rent again.',
    date: '2023-10-15'
  },
  {
    id: 'review-2',
    userId: 'user-2',
    userName: 'Sarah Williams',
    carId: 'car-1',
    rating: 4,
    comment: 'Great experience overall. The car was in excellent condition and very comfortable.',
    date: '2023-09-22'
  },
  {
    id: 'review-3',
    userId: 'user-3',
    userName: 'David Chen',
    carId: 'car-2',
    rating: 5,
    comment: 'The SUV was perfect for our family trip. Spacious, reliable, and good on gas.',
    date: '2023-10-05'
  },
  {
    id: 'review-4',
    userId: 'user-4',
    userName: 'Emily Roberts',
    carId: 'car-3',
    rating: 5,
    comment: 'Driving this luxury car was a dream. Would highly recommend for special occasions!',
    date: '2023-09-18'
  },
  {
    id: 'review-5',
    userId: 'user-5',
    userName: 'James Wilson',
    carId: 'car-4',
    rating: 4,
    comment: 'Great fuel efficiency and easy to drive. Perfect for city commuting.',
    date: '2023-10-12'
  }
];

// Mock car data
export const mockCars: Car[] = [
  {
    id: 'car-1',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    type: 'sedan',
    transmission: 'variable',
    fuelType: 'gasoline',
    seats: 5,
    pricePerDay: 75,
    description: 'The Toyota Camry is a stylish and reliable mid-size sedan perfect for business trips or family vacations. With excellent fuel economy and a smooth ride, this car offers comfort for up to 5 passengers. Its spacious trunk provides ample storage for luggage or shopping.',
    features: [
      'Bluetooth Connectivity',
      'Backup Camera',
      'Keyless Entry',
      'Cruise Control',
      'Apple CarPlay & Android Auto',
      'Lane Departure Warning',
      'Automatic Climate Control'
    ],
    images: [
      'https://avatars.mds.yandex.net/get-autoru-vos/2159790/366bd51533787742e5f2639a8396c653/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2175069/09bda42fa80bffa106cb887effc07969/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2106500/c1b7437d58d5bcb39f752ecec6c13a6b/1200x900n'
    ],
    rating: 4.8,
    reviews: mockReviews.filter(review => review.carId === 'car-1'),
    location: 'Downtown Office',
    link: 'https://auto.ru/cars/new/group/toyota/camry/23895361/23898946/1127319120-6f017d0c/'
  },
  {
    id: 'car-2',
    make: 'Honda',
    model: 'CR-V',
    year: 2020,
    type: 'suv',
    transmission: 'variable',
    fuelType: 'gasoline',
    seats: 5,
    pricePerDay: 90,
    description: 'The Honda CR-V is a versatile and spacious compact SUV with excellent fuel efficiency. Perfect for family trips or outdoor adventures, it offers a comfortable ride with plenty of cargo space. The elevated driving position provides excellent visibility, while the reliable performance ensures peace of mind on any journey.',
    features: [
      'All-Wheel Drive',
      'Spacious Cargo Area',
      'Touchscreen Infotainment',
      'Adaptive Cruise Control',
      'Heated Seats',
      'Panoramic Sunroof',
      'Roof Rails'
    ],
    images: [
      'https://avatars.mds.yandex.net/get-autoru-vos/1629149/9bebc280b17bfd06b356a3ec2bf98a4d/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/4557358/7e7bea3387c78969189f83170d1194d3/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2197551/c7fc6f500cadcedf9e04ec1e2ec21318/1200x900n'
    ],
    rating: 4.7,
    reviews: mockReviews.filter(review => review.carId === 'car-2'),
    location: 'Airport Terminal',
    link: 'https://auto.ru/cars/used/sale/honda/cr_v/1123896948-caaa5dee/'
  },
  {
    id: 'car-3',
    make: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2021,
    type: 'luxury',
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    pricePerDay: 150,
    description: 'The Mercedes-Benz E-Class represents the pinnacle of luxury and performance. This executive sedan offers a refined driving experience with premium materials throughout the cabin. The hybrid powertrain provides impressive fuel efficiency without compromising on power, while the advanced technology features ensure comfort and convenience for all passengers.',
    features: [
      'Premium Leather Seats',
      'Burmester Sound System',
      'Heated & Ventilated Seats',
      'Advanced Driver Assistance',
      'Ambient Lighting',
      'Digital Instrument Cluster',
      'Wireless Charging'
    ],
    images: [
      'https://avatars.mds.yandex.net/get-autoru-vos/2071463/77f4241da5f0880c28b20a2009b15c31/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2162698/777cb7d77bebde2c84fa82068f8b2319/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/1729789/a1488d63394f148d055da6233da9a829/1200x900n'
    ],
    rating: 4.9,
    reviews: mockReviews.filter(review => review.carId === 'car-3'),
    location: 'Downtown Office',
    link: 'https://auto.ru/cars/used/sale/mercedes/e_klasse/1128102151-9e94d3b1/'
  },
  {
    id: 'car-4',
    make: 'Nissan',
    model: 'Leaf',
    year: 2013,
    type: 'hatchback',
    transmission: 'automatic',
    fuelType: 'electric',
    seats: 5,
    pricePerDay: 85,
    description: 'The Nissan Leaf is a fully electric hatchback perfect for eco-conscious travelers. With zero emissions and low operating costs, it\'s ideal for city driving and short trips. The quiet electric motor provides a smooth and responsive driving experience, while the modern interior offers all the technology you need for a comfortable journey.',
    features: [
      'Full Electric Powertrain',
      'Fast Charging Capability',
      'Regenerative Braking',
      'Digital Dashboard',
      'ProPILOT Assist',
      'Energy-Efficient Climate Control',
      'e-Pedal Technology'
    ],
    images: [
      'https://avatars.mds.yandex.net/get-autoru-vos/5231975/bed7d4ec7a14e62d50381bce4f0e6c72/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2160970/ee0a41a90429a4f39d0a2c1c472288bc/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2144428/792a7f68335828142981af7f5aabb748/1200x900n'
    ],
    rating: 4.6,
    reviews: mockReviews.filter(review => review.carId === 'car-4'),
    location: 'North Branch',
    link: 'https://auto.ru/cars/used/sale/nissan/leaf/1128099597-7e79421e/'
  },
  {
    id: 'car-5',
    make: 'BMW',
    model: 'X5',
    year: 2024,
    type: 'suv',
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 7,
    pricePerDay: 130,
    description: 'The BMW X5 is a premium SUV that combines luxury, performance, and versatility. With optional third-row seating, it can accommodate up to 7 passengers in comfort. The powerful diesel engine delivers excellent fuel economy and impressive torque for a confident driving experience. Advanced technology and premium materials create an upscale atmosphere for all occupants.',
    features: [
      'xDrive All-Wheel Drive',
      'Third Row Seating',
      'Premium Audio System',
      'Panoramic Sunroof',
      'Gesture Control',
      'Head-Up Display',
      'Air Suspension'
    ],
    images: [
      'https://avatars.mds.yandex.net/get-autoru-vos/2158839/17135048d160317cfa6c039e716e0f91/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/11608341/97a173c6e2580b388db720c61e8a633d/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/4551970/3ad149f31a6fa157215755562be08dc2/1200x900n'
    ],
    rating: 4.8,
    reviews: [],
    location: 'Airport Terminal',
    link: 'https://auto.ru/cars/used/sale/bmw/x5/1128101272-1a4b6539/'
  },
  {
    id: 'car-6',
    make: 'Chevrolet',
    model: 'Camaro',
    year: 2014,
    type: 'sport',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 4,
    pricePerDay: 120,
    description: 'The Chevrolet Camaro is an iconic American muscle car that delivers exhilarating performance and head-turning style. With a powerful engine and responsive handling, it provides an engaging driving experience for enthusiasts. While it has seating for four, the focus is clearly on the driver\'s experience with a cockpit-style interior and driver-focused controls.',
    features: [
      'V8 Engine',
      'Sport-Tuned Suspension',
      'Brembo Brakes',
      'Launch Control',
      'Drive Mode Selector',
      'Performance Data Recorder',
      'Limited-Slip Differential'
    ],
    images: [
      'https://avatars.mds.yandex.net/get-autoru-vos/4387583/5f85ee607b611bc28d811fd87de68a43/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2163091/2b2ee1cd0da34e4e2225be4237639a74/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2164639/dbe3f90b42f454171cb9a3a266234914/1200x900n'
    ],
    rating: 4.7,
    reviews: [],
    location: 'Downtown Office',
    link: 'https://auto.ru/cars/used/sale/chevrolet/camaro/1125496797-03882d46/'
  },
  {
    id: 'car-7',
    make: 'Audi',
    model: 'A4',
    year: 2021,
    type: 'sedan',
    transmission: 'dual-clutch',
    fuelType: 'gasoline',
    seats: 5,
    pricePerDay: 110,
    description: 'The Audi A4 is a refined luxury sedan that offers a perfect balance of performance, technology, and comfort. With its sophisticated design and high-quality materials, it provides a premium driving experience. The turbocharged engine delivers spirited acceleration, while the well-tuned suspension ensures a smooth and composed ride on any road surface.',
    features: [
      'Quattro All-Wheel Drive',
      'Virtual Cockpit',
      'MMI Touch Interface',
      'Bang & Olufsen Sound',
      'LED Matrix Headlights',
      'Pre-Sense Safety System',
      'Three-Zone Climate Control'
    ],
    images: [
      'https://avatars.mds.yandex.net/get-autoru-vos/11386586/be69846c5dff350778bebd38b905b5ea/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2069437/09deb8860018b6f94b71810e5aa78846/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2102246/765564afc87500c055ffc4f06e49d2e9/1200x900n'
    ],
    rating: 4.6,
    reviews: [],
    location: 'South Port',
    link: 'https://auto.ru/cars/used/sale/audi/a4/1128016518-c58e9966/'
  },
  {
    id: 'car-8',
    make: 'Mazda',
    model: 'MX-5',
    year: 2021,
    type: 'convertible',
    transmission: 'manual',
    fuelType: 'gasoline',
    seats: 2,
    pricePerDay: 95,
    description: 'The Mazda MX-5 Miata is a legendary two-seat convertible that delivers pure driving joy. With its lightweight design and perfect 50/50 weight distribution, it offers exceptional handling and response. The manual soft top can be easily opened or closed in seconds, allowing you to enjoy open-air driving whenever the weather permits. While compact, the thoughtfully designed interior makes the most of the available space.',
    features: [
      'Manual Soft Top',
      'Rear-Wheel Drive',
      'Short-Throw Shifter',
      'Bilstein Shock Absorbers',
      'Leather-Wrapped Steering Wheel',
      'Bose Audio System',
      'Sport-Tuned Suspension'
    ],
    images: [
      'https://avatars.mds.yandex.net/get-autoru-vos/2143031/20946513b94026a0e454e1f985170fb2/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2071463/465ea63827ef607699bb5cf808838638/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/1956707/f9c0c1fbb89d012b60232a39c6feaaa3/1200x900n'
    ],
    rating: 4.9,
    reviews: [],
    location: 'Central Station',
    link: 'https://auto.ru/cars/used/sale/mazda/mx_5/1125170579-41ccd6df/'
  },
  {
    id: 'car-9',
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    type: 'sedan',
    transmission: 'automatic',
    fuelType: 'electric',
    seats: 5,
    pricePerDay: 125,
    description: 'The Tesla Model 3 is a revolutionary electric sedan that combines cutting-edge technology with impressive performance. With instant torque from the electric motors, it delivers exhilarating acceleration and responsive handling. The minimalist interior centers around a large touchscreen that controls most vehicle functions. With zero emissions and low operating costs, it\'s perfect for environmentally conscious travelers.',
    features: [
      'Autopilot Capability',
      'Over-the-Air Updates',
      'Minimalist Interior',
      'Glass Roof',
      'Supercharger Access',
      'Premium Audio System',
      'Keyless Entry via Smartphone'
    ],
    images: [
      'https://avatars.mds.yandex.net/get-autoru-vos/4710094/3e3918b0fe9e9d49406535f4fffb7af9/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/4880007/fbc233cc118f9cf084ecbd6110bd949c/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2072137/93e8ab3bb75d7b557f4123cadbafff87/1200x900n'
    ],
    rating: 4.8,
    reviews: [],
    location: 'Downtown Office',
    link: 'https://auto.ru/cars/used/sale/tesla/model_3/1128004580-6eedbf74/'
  },
  {
    id: 'car-10',
    make: 'Porsche',
    model: '911',
    year: 2025,
    type: 'sport',
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 4,
    pricePerDay: 250,
    description: 'The Porsche 911 is an iconic sports car that has been setting the standard for performance and engineering excellence for decades. With its distinctive silhouette and rear-engine layout, it delivers exceptional balance and handling. The powerful flat-six engine produces an unmistakable sound and thrilling acceleration. While technically a four-seater, the rear seats are best suited for small children or extra cargo.',
    features: [
      'Twin-Turbo Flat-Six Engine',
      'PDK Dual-Clutch Transmission',
      'Sport Chrono Package',
      'Active Suspension Management',
      'Carbon Ceramic Brakes',
      'Sport Exhaust System',
      'Adaptive Sports Seats'
    ],
    images: [
      'https://avatars.mds.yandex.net/get-autoru-vos/5468820/e49d7cddce59632e8b6364b19002c00e/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/1960984/6ceed166823efca4c2479eae8177ca88/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2023743/a91a70a7c458731c4b71b77f269f87c5/1200x900n'
    ],
    rating: 4.9,
    reviews: [],
    location: 'Downtown Office',
    link: 'https://auto.ru/cars/used/sale/porsche/911/1127021546-530bd5c6/'
  },
  {
    id: 'car-11',
    make: 'Toyota',
    model: 'Sienna',
    year: 2021,
    type: 'suv',
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 8,
    pricePerDay: 115,
    description: 'The Toyota Sienna is a spacious and versatile minivan perfect for family trips or group travel. With seating for up to 8 passengers, it offers plenty of room for everyone and their luggage. The hybrid powertrain provides excellent fuel economy, while the comfortable interior features numerous storage compartments and convenience features to make long journeys more pleasant.',
    features: [
      'Hybrid Powertrain',
      'Power Sliding Doors',
      'Captain\'s Chairs',
      'Rear Entertainment System',
      'Built-in Vacuum Cleaner',
      'Driver Easy Speak',
      'Hands-Free Power Liftgate'
    ],
    images: [
      'https://avatars.mds.yandex.net/get-autoru-vos/2068358/529dd67b99db01fdc9039ad47687d502/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/1735445/f841c98c0031eade36a50a418ad79c31/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/1932996/9546e5910ade3aa6495e1f520350e0f3/1200x900n'
    ],
    rating: 4.7,
    reviews: [],
    location: 'Airport Terminal',
    link: 'https://auto.ru/cars/used/sale/toyota/sienna/1127191673-c2071400/'
  },
  {
    id: 'car-12',
    make: 'Ford',
    model: 'Mustang',
    year: 2023,
    type: 'sport',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 4,
    pricePerDay: 115,
    description: 'The Ford Mustang is an American icon that delivers thrilling performance and unmistakable style. With its powerful engine options and responsive handling, it provides an exciting driving experience that stays true to its muscle car heritage. The modern interior combines retro-inspired design elements with contemporary technology features for a perfect blend of nostalgia and convenience.',
    features: [
      'V8 Engine Option',
      'Performance Package',
      'Active Valve Exhaust',
      'Launch Control',
      'Digital Instrument Cluster',
      'Track Apps',
      'Selectable Drive Modes'
    ],
    images: [
      'https://avatars.mds.yandex.net/get-autoru-vos/2071343/3121ce22b899c360ea3246e8168cb9ad/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/2171140/a1447441668eca4b502c20f5ea536421/1200x900n',
      'https://avatars.mds.yandex.net/get-autoru-vos/5985536/568e2d6864ef59af08ab02708b8525e0/1200x900n'
    ],
    rating: 4.6,
    reviews: [],
    location: 'Central Station',
    link: 'https://auto.ru/cars/used/sale/ford/mustang/1126781263-e42d78e2/'
  }
];