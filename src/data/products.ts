import { Product } from '../types';

export const sampleProducts: Product[] = [
  // ===================== DEVICES =====================
  {
    id: 'surface-pro-11',
    title: 'Surface Pro 11th Edition (Copilot+ PC)',
    tagline: 'The most flexible and powerful 2-in-1 PC with next-gen AI processing',
    category: 'devices',
    subcategory: '2-in-1 PCs',
    price: 999.99,
    originalPrice: 1199.99,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 1420,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Copilot+ PC',
    developer: 'Microsoft Surface',
    publisher: 'Microsoft Corporation',
    releaseDate: '2024-06-18',
    platform: ['Windows 11 Home', 'Snapdragon X Elite', 'OLED HDR'],
    description: 'Meet Surface Pro 11th Edition, a Copilot+ PC powered by Snapdragon X Elite and X Plus processors. Unleash industry-leading AI acceleration, up to 14 hours of local video playback, and an optional brilliant OLED PixelSense Flow display.',
    features: [
      'Qualcomm Snapdragon X Elite / X Plus NPU with 45 TOPS AI compute',
      'Optional 13-inch OLED touchscreen with HDR and 120Hz dynamic refresh rate',
      'Ultra-flexible kickstand with detachable Surface Pro Flex Keyboard support',
      'Dual USB-C USB4 ports with support for up to three 4K external monitors',
      'Quad HD front-facing Surface Studio Camera with Windows Studio Effects'
    ],
    specifications: {
      'Processor': 'Snapdragon X Elite (12 Core) / Snapdragon X Plus (10 Core)',
      'NPU': 'Qualcomm Hexagon with 45 TOPS',
      'Memory': '16GB or 32GB LPDDR5x RAM',
      'Storage': 'Removable Gen 4 SSD: 256GB, 512GB, or 1TB',
      'Display': '13" PixelSense Flow OLED (2880 x 1920) 120Hz',
      'Battery Life': 'Up to 14 hours of video playback',
      'Weight': '1.97 lbs (895g)'
    },
    included: [
      'Surface Pro (11th Edition)',
      '39W Power Supply',
      'Quick Start Guide',
      'Safety and warranty documents'
    ],
    isDeal: true,
    featured: true,
    bestSeller: true,
    colorVariants: [
      { id: 'c-platinum', name: 'Platinum', colorHex: '#d8dadf' },
      { id: 'c-sapphire', name: 'Sapphire', colorHex: '#255e94' },
      { id: 'c-dune', name: 'Dune', colorHex: '#d2b48c' },
      { id: 'c-black', name: 'Black', colorHex: '#1e1e1e' }
    ],
    storageVariants: [
      { id: 's-256', name: '256GB SSD (16GB RAM)', priceDelta: 0 },
      { id: 's-512', name: '512GB SSD (16GB RAM OLED)', priceDelta: 200 },
      { id: 's-1tb', name: '1TB SSD (32GB RAM OLED)', priceDelta: 600 }
    ],
    reviews: [
      {
        id: 'r-1',
        author: 'David Harrison',
        rating: 5,
        date: '2025-01-14',
        title: 'Best mobile workstation ever made',
        comment: 'The Snapdragon X Elite chip makes this machine fly. Battery lasts through entire transatlantic flights without a sweat.',
        verified: true,
        helpfulCount: 42
      },
      {
        id: 'r-2',
        author: 'Elena Rostova',
        rating: 5,
        date: '2025-02-01',
        title: 'The OLED screen is breathtaking',
        comment: 'Color accuracy is top tier for Adobe Lightroom and drawing with the Slim Pen 2 feels like genuine paper.',
        verified: true,
        helpfulCount: 28
      }
    ]
  },
  {
    id: 'surface-laptop-7',
    title: 'Surface Laptop 7th Edition',
    tagline: 'Sleek, lightning-fast Copilot+ PC laptop with up to 22 hours of battery',
    category: 'devices',
    subcategory: 'Laptops',
    price: 999.00,
    originalPrice: 1099.00,
    discountPercent: 9,
    rating: 4.8,
    reviewCount: 980,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Popular',
    developer: 'Microsoft Surface',
    publisher: 'Microsoft Corporation',
    releaseDate: '2024-06-18',
    platform: ['Windows 11 Home', 'Copilot Key', 'PixelSense Touch'],
    description: 'Redesigned inside and out, the 7th Edition Surface Laptop delivers exceptional responsiveness, whisper-quiet operation, ultra-thin bezels, and a haptic touchpad.',
    features: [
      'Up to 22 hours of battery life on a single charge',
      'Ultra-thin modern aluminum casing with high precision haptic touchpad',
      'Brilliant PixelSense Flow touchscreen display in 13.8-inch and 15-inch models',
      'Dedicated Microsoft Copilot hardware key for one-tap AI assistance',
      'Full HD Surface Studio Camera with auto-framing and voice focus'
    ],
    specifications: {
      'Processor': 'Snapdragon X Plus (10 core) / X Elite (12 core)',
      'Display': '13.8" PixelSense (2304 x 1536) 120Hz Touch',
      'Memory': '16GB or 32GB LPDDR5x',
      'Storage': '256GB, 512GB, 1TB Gen 4 SSD',
      'Ports': '2x USB-C (USB4), 1x USB-A 3.1, 3.5mm headphone jack',
      'Weight': '2.96 lbs (1.34 kg)'
    },
    included: [
      'Surface Laptop 7',
      'Power Supply',
      'Safety and warranty guide'
    ],
    featured: true,
    bestSeller: true,
    colorVariants: [
      { id: 'c-platinum', name: 'Platinum', colorHex: '#d8dadf' },
      { id: 'c-sapphire', name: 'Sapphire', colorHex: '#255e94' },
      { id: 'c-black', name: 'Black', colorHex: '#1e1e1e' }
    ],
    storageVariants: [
      { id: 's-256', name: '256GB SSD', priceDelta: 0 },
      { id: 's-512', name: '512GB SSD', priceDelta: 200 },
      { id: 's-1tb', name: '1TB SSD', priceDelta: 500 }
    ],
    reviews: [
      {
        id: 'r-sl-1',
        author: 'Marcus Vance',
        rating: 5,
        date: '2025-01-20',
        title: 'MacBook Air rival has arrived',
        comment: 'Runs completely cool, zero fan noise, typing experience is sublime.',
        verified: true,
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'xbox-series-x-galaxy',
    title: 'Xbox Series X – 2TB Galaxy Black Special Edition',
    tagline: 'The fastest, most powerful Xbox with a mesmerizing galaxy starry design',
    category: 'devices',
    subcategory: 'Xbox Consoles',
    price: 599.99,
    originalPrice: 649.99,
    discountPercent: 8,
    rating: 4.95,
    reviewCount: 3820,
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Special Edition',
    developer: 'Xbox Hardware',
    publisher: 'Microsoft Corporation',
    releaseDate: '2024-10-15',
    platform: ['Xbox Series X|S', '4K 120FPS', 'Quick Resume'],
    description: 'Experience 12 teraflops of raw graphic processing power, DirectX ray tracing, custom 2TB NVMe SSD, and true 4K gaming at up to 120 FPS in a stunning Galaxy Black finish with celestial green accents.',
    features: [
      '2TB Custom NVMe SSD for instant loading times and Quick Resume',
      'True 4K Gaming up to 120 FPS with 12 Teraflops of GPU power',
      'Special Edition Galaxy Black console with celestial green D-pad controller',
      'Spatial Sound with Dolby Atmos & Dolby Vision HDR support',
      'Backward compatibility across four generations of thousands of Xbox games'
    ],
    specifications: {
      'CPU': '8X Cores @ 3.8 GHz Custom Zen 2',
      'GPU': '12 TFLOPS, 52 CUs @ 1.825 GHz Custom RDNA 2',
      'Memory': '16GB GDDR6',
      'Storage': '2TB Custom NVMe SSD',
      'Target Performance': 'True 4K @ 60 FPS, up to 120 FPS',
      'Optical Drive': '4K UHD Blu-ray'
    },
    included: [
      'Xbox Series X 2TB Console (Galaxy Black)',
      'Xbox Wireless Controller – Galaxy Black',
      'Ultra High Speed HDMI Cable',
      'Power cord'
    ],
    isDeal: true,
    featured: true,
    bestSeller: true,
    reviews: [
      {
        id: 'r-xb-1',
        author: 'Jordan Sterling',
        rating: 5,
        date: '2025-01-05',
        title: 'Unbelievable loading speeds and look',
        comment: '2TB is the sweet spot. Quick Resume between 5 open games without restarting is witchcraft.',
        verified: true,
        helpfulCount: 88
      }
    ]
  },
  {
    id: 'surface-laptop-studio-2',
    title: 'Surface Laptop Studio 2',
    tagline: 'The ultimate powerhouse 3-in-1 for creator workflows and AAA gaming',
    category: 'devices',
    subcategory: 'Laptops',
    price: 1999.99,
    originalPrice: 2399.99,
    discountPercent: 16,
    rating: 4.7,
    reviewCount: 650,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Pro Creator',
    developer: 'Microsoft Surface',
    publisher: 'Microsoft Corporation',
    releaseDate: '2023-10-03',
    platform: ['Windows 11 Pro', 'Intel i7 13th Gen', 'NVIDIA RTX 4060'],
    description: 'Transform effortlessly from a sleek laptop to a dynamic angled entertainment stage, or a flat digital studio canvas. Packed with Intel 13th Gen i7 and NVIDIA GeForce RTX 4060 graphics.',
    features: [
      'Dynamic Woven Hinge seamlessly shifts between 3 unique modes',
      '14.4" PixelSense Flow touchscreen with 120Hz refresh rate and HDR',
      'NVIDIA GeForce RTX 4060 GPU with Studio Drivers for 3D rendering and gaming',
      'Built-in Slim Pen 2 magnetic storage and wireless charging under keyboard',
      'Thunderbolt 4 ports + MicroSD card reader for professional workflows'
    ],
    specifications: {
      'Processor': '13th Gen Intel Core i7-13700H',
      'Graphics': 'NVIDIA GeForce RTX 4060 Laptop GPU (8GB GDDR6)',
      'Memory': '32GB / 64GB LPDDR5x RAM',
      'Storage': '1TB / 2TB Gen 4 SSD',
      'Display': '14.4" (2400 x 1600) 120Hz HDR',
      'Weight': '4.37 lbs (1.98 kg)'
    },
    included: [
      'Surface Laptop Studio 2',
      '120W Surface Power Supply',
      'Quick Start Guide'
    ],
    isDeal: true,
    featured: false,
    bestSeller: false,
    reviews: []
  },

  // ===================== ACCESSORIES =====================
  {
    id: 'xbox-controller-stellar-shift',
    title: 'Xbox Wireless Controller – Stellar Shift Special Edition',
    tagline: 'Mesmerizing color-shifting blue-purple shimmer with rubberized swirl grips',
    category: 'accessories',
    subcategory: 'Controllers',
    price: 49.99,
    originalPrice: 69.99,
    discountPercent: 28,
    rating: 4.9,
    reviewCount: 5410,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Best Seller',
    developer: 'Xbox Design Lab',
    publisher: 'Microsoft Corporation',
    releaseDate: '2024-02-10',
    platform: ['Xbox Series X|S', 'Windows 11', 'Android', 'iOS'],
    description: 'Elevate your game with the Xbox Wireless Controller in Stellar Shift, featuring a dynamic color-changing iridescent finish, textured trigger grips, and seamless button remapping.',
    features: [
      'Hybrid D-pad and textured grip on triggers, bumpers, and back case',
      'Dedicated Share button to seamlessly capture and share screenshots and clips',
      'Bluetooth & Xbox Wireless technology for PC, console, tablet, and mobile gaming',
      'Up to 40 hours of battery life with standard AA batteries'
    ],
    specifications: {
      'Connectivity': 'Xbox Wireless, Bluetooth Low Energy, USB-C wired',
      'Compatibility': 'Xbox Series X, Xbox Series S, Xbox One, Windows 10/11, Android, iOS',
      'Battery': '2x AA batteries included (up to 40 hours)',
      'Audio': '3.5mm stereo headset jack'
    },
    included: [
      'Xbox Wireless Controller (Stellar Shift)',
      '2x AA batteries',
      'Documentation'
    ],
    isDeal: true,
    featured: true,
    bestSeller: true,
    reviews: [
      {
        id: 'r-c-1',
        author: 'Samantha Lee',
        rating: 5,
        date: '2025-02-11',
        title: 'Colors in person look magical',
        comment: 'Changes from deep violet to azure blue depending on ambient lighting. Grips feel superior to standard edition.',
        verified: true,
        helpfulCount: 54
      }
    ]
  },
  {
    id: 'surface-pro-flex-keyboard',
    title: 'Surface Pro Flex Keyboard with Slim Pen',
    tagline: 'Versatile wireless 2-in-1 keyboard crafted with luxury Alcantara',
    category: 'accessories',
    subcategory: 'Keyboards & Mice',
    price: 349.99,
    originalPrice: 399.99,
    discountPercent: 12,
    rating: 4.75,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'New',
    developer: 'Microsoft Surface',
    publisher: 'Microsoft Corporation',
    releaseDate: '2024-06-18',
    platform: ['Surface Pro 11', 'Surface Pro 10', 'Surface Pro 9'],
    description: 'Use attached or detached. The Surface Pro Flex Keyboard allows you to position your screen and keyboard anywhere you want for unprecedented ergonomics.',
    features: [
      'Works both attached to your Surface Pro or completely wireless via Bluetooth',
      'Integrated storage and wireless fast charger for Surface Slim Pen (2nd Gen)',
      'Precision haptic glass touchpad with customizable click intensity',
      'Copilot key and full row of function keys with backlight'
    ],
    specifications: {
      'Material': 'Signature Alcantara fabric',
      'Battery': 'Built-in rechargeable battery (up to 41 hours continuous wireless typing)',
      'Dimensions': '11.38" x 8.71" x 0.21"',
      'Weight': '340 grams'
    },
    included: [
      'Surface Pro Flex Keyboard',
      'Surface Slim Pen (2nd Gen)',
      'Documentation'
    ],
    isDeal: false,
    featured: true,
    bestSeller: false,
    reviews: []
  },
  {
    id: 'xbox-wireless-headset',
    title: 'Xbox Wireless Headset (New Refresh)',
    tagline: 'Immerse in crystal-clear audio with Dolby Atmos, Bluetooth & direct Xbox pairing',
    category: 'accessories',
    subcategory: 'Audio',
    price: 99.99,
    originalPrice: 109.99,
    discountPercent: 9,
    rating: 4.8,
    reviewCount: 2200,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Top Audio',
    developer: 'Xbox Hardware',
    publisher: 'Microsoft Corporation',
    releaseDate: '2024-10-22',
    platform: ['Xbox Series X|S', 'Windows 11', 'Mobile'],
    description: 'Game loud and clear with direct console pairing without dongles or cables. Features dual rotating earcup dials to adjust game/chat audio volume on the fly.',
    features: [
      'Dolby Atmos license included out of the box for realistic spatial 3D audio',
      'Simultaneous Bluetooth & Xbox Wireless pairing for taking phone calls while gaming',
      'Auto-mute and voice isolation microphone for crystal clear party chat',
      'Up to 20 hours of battery life on a 30-minute quick charge'
    ],
    specifications: {
      'Speakers': '40mm Neodymium drivers',
      'Frequency Response': '20Hz - 20,000Hz',
      'Battery': 'Up to 20 hours battery life',
      'Weight': '312g'
    },
    included: [
      'Xbox Wireless Headset',
      'USB-C charging cable (14 inches)',
      'Quick Start Guide'
    ],
    isDeal: true,
    featured: false,
    bestSeller: true,
    reviews: []
  },
  {
    id: 'surface-arc-mouse',
    title: 'Surface Arc Mouse – Matte Black',
    tagline: 'Ultra-slim, travel-friendly mouse that snaps flat to slip into your pocket',
    category: 'accessories',
    subcategory: 'Keyboards & Mice',
    price: 54.99,
    originalPrice: 79.99,
    discountPercent: 31,
    rating: 4.6,
    reviewCount: 1890,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Deal of the Day',
    developer: 'Microsoft Surface',
    publisher: 'Microsoft Corporation',
    releaseDate: '2023-05-15',
    platform: ['Windows 11', 'Windows 10', 'macOS', 'Android'],
    description: 'Snap into curved position to turn on. Snap flat to turn off. Designed to conform to your hand and pack effortlessly into your bag.',
    features: [
      'Ultra-thin and lightweight travel profile',
      'Full scroll plane for horizontal and vertical scrolling',
      'Connects wirelessly via Bluetooth 4.1/5.0 with Swift Pair',
      'Up to 6 months of battery life on 2 AAA batteries'
    ],
    specifications: {
      'Tracking': 'Microsoft BlueTrack Technology',
      'Wireless Range': '33 feet (10 meters) in open air',
      'Weight': '2.91 oz (82.5g) including batteries'
    },
    included: [
      'Surface Arc Mouse',
      '2x AAA alkaline batteries',
      'User manual'
    ],
    isDeal: true,
    featured: false,
    bestSeller: false,
    reviews: []
  },

  // ===================== GAMES =====================
  {
    id: 'forza-horizon-5-premium',
    title: 'Forza Horizon 5: Premium Edition',
    tagline: 'Your ultimate Horizon adventure awaits in the vibrant landscapes of Mexico',
    category: 'games',
    subcategory: 'Racing & Flying',
    price: 49.99,
    originalPrice: 99.99,
    discountPercent: 50,
    rating: 4.9,
    reviewCount: 12400,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Game Pass Included',
    developer: 'Playground Games',
    publisher: 'Xbox Game Studios',
    releaseDate: '2021-11-09',
    platform: ['Xbox Series X|S', 'Windows 11 PC', 'Xbox Cloud Gaming'],
    description: 'Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world\'s greatest cars.',
    features: [
      'Includes Forza Horizon 5: Rally Adventure & Hot Wheels Expansions',
      'VIP Membership, Car Pass (42 bonus cars), and Welcome Pack included',
      '4K Ultra HD at 60 FPS on Xbox Series X with photorealistic ray tracing',
      'Cross-play and cross-save across Xbox and PC Windows 11'
    ],
    specifications: {
      'Approximate Size': '130 GB',
      'Age Rating': 'ESRB Everyone (E)',
      'Multiplayer': 'Online multiplayer (2-12 players), Co-op',
      'Audio': 'Dolby Atmos, 7.1 Surround'
    },
    included: [
      'Forza Horizon 5 Full Game',
      'Hot Wheels Expansion',
      'Rally Adventure Expansion',
      'Car Pass + Welcome Pack + VIP'
    ],
    isDeal: true,
    featured: true,
    bestSeller: true,
    gamePassIncluded: true,
    downloadSize: '130 GB',
    ageRating: 'E (Everyone)',
    reviews: [
      {
        id: 'r-fh-1',
        author: 'Alexandre Roy',
        rating: 5,
        date: '2025-01-28',
        title: 'Masterpiece of visual fidelity',
        comment: 'Driving through the rainforest in a Porsche 911 GT3 with realistic weather cycles is peak arcade racing.',
        verified: true,
        helpfulCount: 112
      }
    ]
  },
  {
    id: 'minecraft-deluxe-collection',
    title: 'Minecraft: Java & Bedrock Edition Deluxe',
    tagline: 'Create, explore, survive, and build anything you can imagine with friends',
    category: 'games',
    subcategory: 'Adventure & Sandbox',
    price: 29.99,
    originalPrice: 39.99,
    discountPercent: 25,
    rating: 4.95,
    reviewCount: 48900,
    image: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'All-Time Classic',
    developer: 'Mojang Studios',
    publisher: 'Xbox Game Studios',
    releaseDate: '2022-06-07',
    platform: ['Windows 11', 'Xbox Series X|S', 'Mac', 'Linux'],
    description: 'Get both Minecraft Java and Bedrock editions in one purchase with cross-play across any modern platform, plus 1600 Minecoins, 5 maps, 3 emote packs, and 5 skin sets.',
    features: [
      'Unified launcher containing both Minecraft Java Edition and Bedrock Edition',
      '1,600 Minecoins included for custom Marketplace skins, maps, and texture packs',
      'Massive multiplayer servers with millions of active creators',
      'Ray tracing with NVIDIA RTX on compatible Windows 11 hardware'
    ],
    specifications: {
      'Approximate Size': '2.5 GB base game',
      'Age Rating': 'Everyone 10+ (Fantasy Violence)',
      'Cross-play': 'Supported across PC, Xbox, PlayStation, Switch, iOS & Android'
    },
    included: [
      'Minecraft Java Edition',
      'Minecraft Bedrock Edition',
      '1600 Minecoins',
      'Deluxe content bundle'
    ],
    isDeal: true,
    featured: true,
    bestSeller: true,
    gamePassIncluded: true,
    downloadSize: '3.2 GB',
    ageRating: 'E10+',
    reviews: []
  },
  {
    id: 'flight-simulator-2024',
    title: 'Microsoft Flight Simulator 2024 – Aviator Edition',
    tagline: 'Pursue your dream aviation career with the most detailed Earth simulation ever built',
    category: 'games',
    subcategory: 'Simulation',
    price: 129.99,
    originalPrice: 199.99,
    discountPercent: 35,
    rating: 4.85,
    reviewCount: 3900,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Next-Gen Simulator',
    developer: 'Asobo Studio',
    publisher: 'Xbox Game Studios',
    releaseDate: '2024-11-19',
    platform: ['Xbox Series X|S', 'Windows 11 PC'],
    description: 'Fly anywhere on planet Earth with revolutionary digital twin photogrammetry, real-time live weather, procedural 3D trees, dynamic animal herds, and over 125 meticulously recreated aircraft.',
    features: [
      'Aviator Edition includes all 30 Microsoft-published payware aircraft from 2020-2024',
      'Full career system: Search & Rescue, Commercial Airlines, Aerial Firefighting, VIP Charter',
      'True 1:1 scale Earth powered by Bing Maps satellite imagery and Azure AI',
      'Full VR support with Windows Mixed Reality and SteamVR headsets'
    ],
    specifications: {
      'Approximate Size': '50 GB initial client (Cloud streaming architecture)',
      'Recommended GPU': 'NVIDIA RTX 4070 or AMD RX 7800 XT',
      'Recommended RAM': '32 GB DDR5',
      'Internet': 'Fast broadband recommended for live streaming scenery'
    },
    included: [
      'Flight Simulator 2024 Full Game',
      'Aviator Aircraft Fleet Pack (30 planes)',
      'Premium Deluxe Handcrafted Airports (25 international hubs)'
    ],
    isDeal: true,
    featured: true,
    bestSeller: false,
    gamePassIncluded: true,
    downloadSize: '50 GB',
    ageRating: 'E (Everyone)',
    reviews: []
  },
  {
    id: 'sea-of-thieves-2026',
    title: 'Sea of Thieves: 2026 Premium Edition',
    tagline: 'Sail, fight, explore, and loot the high seas in the ultimate pirate sandbox',
    category: 'games',
    subcategory: 'Action & Adventure',
    price: 24.99,
    originalPrice: 49.99,
    discountPercent: 50,
    rating: 4.7,
    reviewCount: 8900,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Sale 50% Off',
    developer: 'Rare Ltd.',
    publisher: 'Xbox Game Studios',
    releaseDate: '2024-04-30',
    platform: ['Xbox Series X|S', 'Windows 11', 'PS5 Crossplay'],
    description: 'Live the essential pirate life with complete freedom. Engage in cannon battles, discover hidden buried treasures, and become a legendary Pirate Lord.',
    features: [
      'Includes 10,000 Ancient Coins, Collector\'s Dark Warsmith Ship Set & weapons',
      'Full cross-play across PC, Xbox, and PlayStation',
      'Safer Seas mode for solo/private crew sailing and High Seas for open PvP'
    ],
    specifications: {
      'Approximate Size': '85 GB',
      'Age Rating': 'Teen (Use of Alcohol, Violence)'
    },
    included: ['Sea of Thieves Game', 'Premium DLC Cosmetics Bundle', 'Plunder Pass Access'],
    isDeal: true,
    featured: false,
    bestSeller: false,
    gamePassIncluded: true,
    downloadSize: '85 GB',
    ageRating: 'T (Teen)',
    reviews: []
  },
  {
    id: 'halo-infinite-campaign',
    title: 'Halo Infinite (Campaign & Multiplayer)',
    tagline: 'Become the Master Chief and save humanity on the legendary Zeta Halo ring',
    category: 'games',
    subcategory: 'Shooter',
    price: 19.99,
    originalPrice: 59.99,
    discountPercent: 67,
    rating: 4.6,
    reviewCount: 15100,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Super Deal',
    developer: '343 Industries',
    publisher: 'Xbox Game Studios',
    releaseDate: '2021-12-08',
    platform: ['Xbox Series X|S', 'Windows 11 PC'],
    description: 'When all hope is lost, the Master Chief returns to confront the ruthless Banished. Explore the vast ringworld of Zeta Halo with grappleshot mobility, open-world FOB bases, and free multiplayer.',
    features: [
      'Full Open-World Halo Campaign with 4-player online campaign co-op',
      'Free-to-Play multiplayer with Forge map creator and endless custom games',
      'Ultra-wide monitor support and 120 FPS high-refresh rate mode'
    ],
    specifications: {
      'Approximate Size': '70 GB',
      'Age Rating': 'Teen (Blood, Mild Language, Violence)'
    },
    included: ['Halo Infinite Campaign', 'Multiplayer Access', 'Master Chief Armor Set'],
    isDeal: true,
    featured: false,
    bestSeller: false,
    gamePassIncluded: true,
    downloadSize: '70 GB',
    ageRating: 'T (Teen)',
    reviews: []
  },

  // ===================== APPS & PRODUCTIVITY =====================
  {
    id: 'microsoft-365-family',
    title: 'Microsoft 365 Family (1-Year Subscription)',
    tagline: 'Premium Office apps, 6TB cloud storage, advanced security & Copilot AI for up to 6 people',
    category: 'productivity',
    subcategory: 'Productivity Suites',
    price: 99.99,
    originalPrice: 119.99,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 32000,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Essential',
    developer: 'Microsoft Corporation',
    publisher: 'Microsoft Corporation',
    releaseDate: '2024-01-01',
    platform: ['Windows 11', 'macOS', 'iOS', 'Android'],
    description: 'Everything you need to create, collaborate, and protect your digital life. Share with up to 6 people, each getting 1TB of secure OneDrive cloud storage and full desktop Office apps.',
    features: [
      'Word, Excel, PowerPoint, Outlook, OneNote, and Microsoft Defender',
      '6TB total cloud storage (1TB per person for up to 6 people)',
      'Microsoft Copilot AI assistant integrated directly into Word, PowerPoint and Excel',
      'Advanced ransomware protection and file recovery with OneDrive Personal Vault',
      'Microsoft Clipchamp video editor with premium filters and exports'
    ],
    specifications: {
      'License': '12-month auto-renewing digital subscription for 6 users',
      'Supported Devices': 'Up to 5 concurrent devices per user (PC, Mac, iPad, iPhone, Android)'
    },
    included: [
      'Word, Excel, PowerPoint, Outlook, OneNote desktop & web apps',
      '6TB OneDrive cloud storage (1TB x 6)',
      'Microsoft Defender & Clipchamp Premium'
    ],
    isDeal: true,
    featured: true,
    bestSeller: true,
    reviews: [
      {
        id: 'r-m365-1',
        author: 'Robert Jenkins',
        rating: 5,
        date: '2025-02-14',
        title: 'Unbeatable value for the whole family',
        comment: 'Between the 6TB cloud storage and full Office apps on all our laptops and iPads, it pays for itself tenfold.',
        verified: true,
        helpfulCount: 79
      }
    ]
  },
  {
    id: 'visual-studio-code',
    title: 'Visual Studio Code',
    tagline: 'Code editing. Redefined. Free, built on open source, runs everywhere.',
    category: 'apps',
    subcategory: 'Developer Tools',
    price: 0.00,
    isFree: true,
    rating: 4.95,
    reviewCount: 65200,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Editor\'s Choice',
    developer: 'Microsoft Corporation',
    publisher: 'Microsoft Corporation',
    releaseDate: '2024-05-01',
    platform: ['Windows 11', 'macOS', 'Linux', 'ARM64'],
    description: 'Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop. It comes with built-in support for JavaScript, TypeScript and Node.js and a rich ecosystem of extensions.',
    features: [
      'IntelliSense smart completions based on variable types, function definitions, and imported modules',
      'Built-in Git commands and diff comparison tools',
      'Extensive marketplace with thousands of themes, debuggers, and language packs',
      'GitHub Copilot AI deep integration for instant code explanations and completions'
    ],
    specifications: {
      'Download Size': '92 MB',
      'Architecture': 'x64, ARM64',
      'License': 'MIT Free and Open Source'
    },
    included: ['Visual Studio Code Full Application', 'Git Integration', 'Terminal Environment'],
    isDeal: false,
    featured: true,
    bestSeller: true,
    downloadSize: '92 MB',
    ageRating: 'All Ages',
    reviews: [
      {
        id: 'r-vsc-1',
        author: 'Sarah Chen',
        rating: 5,
        date: '2025-01-30',
        title: 'The gold standard of software engineering',
        comment: 'Fast, customizable, extensions for everything from Rust to React. Couldn’t do my job without it.',
        verified: true,
        helpfulCount: 210
      }
    ]
  },
  {
    id: 'spotify-music',
    title: 'Spotify: Music and Podcasts',
    tagline: 'Listen to over 100 million songs, playlists, podcasts, and audiobooks for free',
    category: 'apps',
    subcategory: 'Music & Audio',
    price: 0.00,
    isFree: true,
    rating: 4.7,
    reviewCount: 42100,
    image: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Free Download',
    developer: 'Spotify AB',
    publisher: 'Spotify',
    releaseDate: '2024-03-12',
    platform: ['Windows 11', 'Xbox Series X|S', 'Windows Game Bar'],
    description: 'Play the songs you love and discover new music from all over the world. Control music with keyboard hotkeys or background audio during Xbox gaming sessions.',
    features: [
      'Background playback during intense PC gaming and Xbox gameplay',
      'Windows 11 native Media Controls and Game Bar widget support',
      'HiFi Lossless streaming & offline downloads with Spotify Premium',
      'Create collaborative playlists with friends in real time'
    ],
    specifications: {
      'Download Size': '140 MB',
      'Audio Quality': 'Up to 320 kbps High Quality'
    },
    included: ['Spotify Desktop Application'],
    isDeal: false,
    featured: true,
    bestSeller: true,
    downloadSize: '140 MB',
    ageRating: '12+',
    reviews: []
  },
  {
    id: 'blender-3d-suite',
    title: 'Blender 3D Suite',
    tagline: 'Open source 3D creation pipeline supporting modeling, rigging, animation & VFX',
    category: 'productivity',
    subcategory: 'Design & Graphics',
    price: 0.00,
    isFree: true,
    rating: 4.95,
    reviewCount: 18500,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Open Source',
    developer: 'Blender Foundation',
    publisher: 'Blender Foundation',
    releaseDate: '2024-07-20',
    platform: ['Windows 11 (64-bit)', 'DirectX 12 / Vulkan'],
    description: 'Blender is the free and open source 3D creation suite. It supports the entirety of the 3D pipeline—modeling, rigging, animation, simulation, rendering, compositing, motion tracking, and video editing.',
    features: [
      'Cycles path-tracing rendering engine with GPU acceleration (RTX OptiX / AMD HIP)',
      'Sculpting tools with dynamic topology and multi-resolution modifiers',
      'Grease Pencil 2D animation inside full 3D viewport',
      'Python API for custom scripting and add-ons'
    ],
    specifications: {
      'Download Size': '320 MB',
      'Hardware Requirements': '64-bit quad-core CPU, 8GB RAM (16GB+ recommended), OpenGL 4.3+'
    },
    included: ['Blender 3D Complete Studio'],
    isDeal: false,
    featured: false,
    bestSeller: true,
    downloadSize: '320 MB',
    ageRating: 'All Ages',
    reviews: []
  },
  {
    id: 'adobe-lightroom-plan',
    title: 'Adobe Lightroom & Photoshop Photography Plan',
    tagline: 'Transform your photos with AI masking, cloud presets, and Photoshop retouching',
    category: 'apps',
    subcategory: 'Photo & Video',
    price: 9.99,
    originalPrice: 19.99,
    discountPercent: 50,
    rating: 4.8,
    reviewCount: 9400,
    image: 'https://images.unsplash.com/photo-1542744094-3a3172720a8a?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542744094-3a3172720a8a?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Save 50% First Month',
    developer: 'Adobe Inc.',
    publisher: 'Adobe',
    releaseDate: '2024-02-01',
    platform: ['Windows 11', 'Surface Pen Optimized', 'Copilot+ NPU Acceleration'],
    description: 'Edit, organize, store, and share your photos across desktop, mobile, and web. Powerful AI-driven Generative Fill and Denoise let you achieve studio quality instantly.',
    features: [
      'Includes Lightroom, Lightroom Classic, and Photoshop on Windows 11 desktop',
      'AI Denoise and AI Lens Blur with instant depth mapping',
      '1TB cloud storage to access full-resolution RAW files anywhere',
      'Direct optimization for Surface Pro Slim Pen stylus and touch displays'
    ],
    specifications: {
      'License': 'Monthly Creative Cloud Subscription',
      'Cloud Storage': '1TB Cloud Photo Vault'
    },
    included: ['Adobe Lightroom', 'Adobe Photoshop', '1TB Cloud Storage'],
    isDeal: true,
    featured: true,
    bestSeller: false,
    reviews: []
  },
  {
    id: 'canva-design-desktop',
    title: 'Canva: Design, Photo & Video Suite',
    tagline: 'Create stunning social graphics, presentations, resumes, and video reels with AI',
    category: 'productivity',
    subcategory: 'Design & Graphics',
    price: 0.00,
    isFree: true,
    rating: 4.85,
    reviewCount: 27800,
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Popular Free App',
    developer: 'Canva Pty Ltd',
    publisher: 'Canva',
    releaseDate: '2024-01-10',
    platform: ['Windows 11', 'Windows 10'],
    description: 'Canva makes visual design amazingly simple. Create social media posts, presentations, posters, documents, and videos with millions of free templates.',
    features: [
      'Magic Studio AI tools: Magic Write, Magic Expand, and Text-to-Image',
      'Over 250,000 free templates and 1 million+ free stock photos and graphics',
      'Drag-and-drop video editor with automated audio sync',
      'Seamless real-time team collaboration with comments and live sharing'
    ],
    specifications: {
      'Download Size': '185 MB',
      'Language': 'English, Spanish, French, German, Japanese and 30+ more'
    },
    included: ['Canva Native Windows Application'],
    isDeal: false,
    featured: false,
    bestSeller: true,
    downloadSize: '185 MB',
    ageRating: 'All Ages',
    reviews: []
  },

  // ===================== ENTERTAINMENT & MOVIES =====================
  {
    id: 'dune-part-two-uhd',
    title: 'Dune: Part Two (4K UHD + Bonus Features)',
    tagline: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against conspirators',
    category: 'entertainment',
    subcategory: 'Sci-Fi & Action',
    price: 19.99,
    originalPrice: 24.99,
    discountPercent: 20,
    rating: 4.95,
    reviewCount: 16800,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Blockbuster Hit',
    developer: 'Legendary Pictures / Warner Bros.',
    publisher: 'Microsoft Movies & TV',
    releaseDate: '2024-03-01',
    platform: ['Windows 11 Movies & TV', 'Xbox Series X|S', 'Movies Anywhere'],
    description: 'Denis Villeneuve’s visionary cinematic epic continues. As Paul Atreides faces a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
    features: [
      'Stunning 4K Ultra HD resolution with Dolby Vision HDR',
      'Immersive Dolby Atmos surround sound mix',
      'Over 60 minutes of behind-the-scenes IMAX featurettes and director commentary',
      'Movies Anywhere compatible—unlock across all your connected digital retailers'
    ],
    specifications: {
      'Run Time': '2 hours 46 minutes',
      'Audio': 'Dolby Atmos, English 5.1, Spanish, French',
      'Subtitles': 'English CC, Spanish, French, German, Italian'
    },
    included: ['4K UHD Digital Copy', 'Bonus Featurettes Pack'],
    isDeal: true,
    featured: true,
    bestSeller: true,
    ageRating: 'PG-13',
    reviews: [
      {
        id: 'r-dune-1',
        author: 'Nathan Cruz',
        rating: 5,
        date: '2025-01-18',
        title: 'Masterpiece of science fiction cinema',
        comment: 'Hans Zimmer\'s soundtrack in Dolby Atmos on Xbox Wireless Headset will shake your soul.',
        verified: true,
        helpfulCount: 84
      }
    ]
  },
  {
    id: 'oppenheimer-uhd',
    title: 'Oppenheimer (Collector\'s Edition 4K UHD)',
    tagline: 'Christopher Nolan\'s Academy Award-winning historical thriller masterpiece',
    category: 'entertainment',
    subcategory: 'Drama & History',
    price: 14.99,
    originalPrice: 19.99,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 22100,
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Oscar Winner',
    developer: 'Syncopy / Universal Pictures',
    publisher: 'Microsoft Movies & TV',
    releaseDate: '2023-11-21',
    platform: ['Windows 11', 'Xbox Consoles', 'Movies Anywhere'],
    description: 'Winner of 7 Academy Awards including Best Picture. The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    features: [
      'Ultra HD 4K with IMAX format alternating aspect ratio presentation',
      'Includes feature-length documentary "The Story of Our Time: The Making of Oppenheimer"',
      'Movies Anywhere cross-retailer playback'
    ],
    specifications: {
      'Run Time': '3 hours 0 minutes',
      'Rating': 'R (Restricted)'
    },
    included: ['4K UHD Digital Feature', 'Making of Oppenheimer Documentary'],
    isDeal: true,
    featured: false,
    bestSeller: true,
    ageRating: 'R',
    reviews: []
  },
  {
    id: 'spider-man-across-spiderverse',
    title: 'Spider-Man: Across the Spider-Verse',
    tagline: 'Miles Morales catapults across the Multiverse to encounter a team of Spider-People',
    category: 'entertainment',
    subcategory: 'Animation & Action',
    price: 12.99,
    originalPrice: 19.99,
    discountPercent: 35,
    rating: 4.95,
    reviewCount: 31000,
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=900&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=900&auto=format&fit=crop&q=80'
    ],
    badge: 'Fan Favorite',
    developer: 'Sony Pictures Animation',
    publisher: 'Microsoft Movies & TV',
    releaseDate: '2023-08-08',
    platform: ['Windows 11', 'Xbox Series X|S'],
    description: 'Miles Morales returns for an epic adventure that transports Brooklyn’s full-time Spider-Man across the Multiverse to join forces with Gwen Stacy and a new team of Spider-Heroes.',
    features: [
      '4K HDR with dynamic comic-book art style and color palette',
      'Dolby Atmos spatial surround soundtrack by Metro Boomin & Daniel Pemberton',
      'Filmmaker commentary and character design gallery included'
    ],
    specifications: {
      'Run Time': '2 hours 20 minutes',
      'Age Rating': 'PG (Frenetic sequences of animated action)'
    },
    included: ['4K UHD Feature', 'Multiverse Easter Egg Tour'],
    isDeal: true,
    featured: false,
    bestSeller: true,
    ageRating: 'PG',
    reviews: []
  }
];

export const heroSlides = [
  {
    id: 'hero-surface-copilot',
    productId: 'surface-pro-11',
    category: 'devices',
    badge: 'NEW GENERATION COPILOT+ PC',
    title: 'Surface Pro 11th Edition',
    subtitle: 'Unprecedented AI power, ultra-vibrant OLED touchscreen, and battery that outlasts your longest days. The future of 2-in-1 computing is here.',
    priceText: 'From $999.99 (Save $200)',
    primaryCta: 'Shop Surface Pro',
    secondaryCta: 'Explore Tech Specs',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&auto=format&fit=crop&q=80',
    bgGradient: 'from-slate-900 via-neutral-900 to-indigo-950',
    accentColor: '#0067b8',
    specsBadge: '45 TOPS NPU • 14h Battery • OLED'
  },
  {
    id: 'hero-xbox-galaxy',
    productId: 'xbox-series-x-galaxy',
    category: 'devices',
    badge: 'LIMITED TIME DEAL',
    title: 'Xbox Series X – 2TB Galaxy Black',
    subtitle: 'Power your dreams with 12 Teraflops of raw processing speed, 4K 120 FPS gaming, and double the high-speed storage.',
    priceText: '$599.99 (Was $649.99)',
    primaryCta: 'Buy Xbox Series X',
    secondaryCta: 'Browse Xbox Games',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=1200&auto=format&fit=crop&q=80',
    bgGradient: 'from-emerald-950 via-neutral-900 to-zinc-950',
    accentColor: '#107c10',
    specsBadge: '2TB Custom SSD • 4K 120FPS • Ray Tracing'
  },
  {
    id: 'hero-forza-5',
    productId: 'forza-horizon-5-premium',
    category: 'games',
    badge: 'SAVE 50% THIS WEEK',
    title: 'Forza Horizon 5 Premium',
    subtitle: 'Tear across gorgeous deserts, ancient ruins, and tropical beaches in Mexico with over 800 authentic hypercars and rally beasts.',
    priceText: 'Only $49.99 with Game Pass discount',
    primaryCta: 'Get Premium Edition',
    secondaryCta: 'Join Game Pass',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    bgGradient: 'from-amber-950 via-neutral-900 to-rose-950',
    accentColor: '#e04c00',
    specsBadge: '4K Ultra HD • HDR10 • Rally & Hot Wheels'
  },
  {
    id: 'hero-m365-copilot',
    productId: 'microsoft-365-family',
    category: 'productivity',
    badge: 'SMARTER PRODUCTIVITY',
    title: 'Microsoft 365 + Copilot AI',
    subtitle: 'Transform how your family creates, learns, and communicates. Includes Word, Excel, PowerPoint, 6TB secure cloud storage, and AI assistance.',
    priceText: 'Only $99.99/year for up to 6 people',
    primaryCta: 'Try 1 Month Free',
    secondaryCta: 'Compare Plans',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80',
    bgGradient: 'from-blue-950 via-slate-900 to-cyan-950',
    accentColor: '#0078d4',
    specsBadge: '6 Users • 6TB Cloud • Copilot Assistant'
  }
];

export const categoryTiles = [
  {
    id: 'apps',
    title: 'Apps',
    description: 'Essential software, tools & creativity apps',
    iconName: 'LayoutGrid',
    color: 'bg-blue-50 text-blue-700 border-blue-200 group-hover:border-blue-500',
    count: '10,000+ apps',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'games',
    title: 'Games',
    description: 'Blockbuster titles, indies & Game Pass',
    iconName: 'Gamepad2',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:border-emerald-500',
    count: '3,500+ games',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'devices',
    title: 'Laptops & 2-in-1s',
    description: 'Surface Pro, Surface Laptop & Copilot+ PCs',
    iconName: 'Laptop',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200 group-hover:border-indigo-500',
    count: 'Surface Lineup',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    description: 'Controllers, keyboards, mice & headsets',
    iconName: 'Headphones',
    color: 'bg-purple-50 text-purple-700 border-purple-200 group-hover:border-purple-500',
    count: 'Original Gear',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'entertainment',
    title: 'Movies & TV',
    description: '4K Ultra HD digital movies & TV series',
    iconName: 'Film',
    color: 'bg-rose-50 text-rose-700 border-rose-200 group-hover:border-rose-500',
    count: 'Hollywood Hits',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'productivity',
    title: 'Productivity & Office',
    description: 'Microsoft 365, Copilot AI & Windows 11',
    iconName: 'Briefcase',
    color: 'bg-cyan-50 text-cyan-700 border-cyan-200 group-hover:border-cyan-500',
    count: 'Work & Create',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'deals',
    title: 'Deals & Savings',
    description: 'Save up to 50% on top hardware & software',
    iconName: 'Tag',
    color: 'bg-amber-50 text-amber-700 border-amber-200 group-hover:border-amber-500',
    count: 'Limited Time',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=400&auto=format&fit=crop&q=80'
  }
];
