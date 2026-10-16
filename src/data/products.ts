export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  descriptionEN?: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  badgeEN?: string;
  category: string;
  imageUrl: string;
  images?: string[];
  heroImageUrl?: string;
  colors?: string[];
  specs: {
    screen?: string;
    chip?: string;
    camera?: string;
    battery?: string;
  };
}

export const products: Product[] = [
  // Apple
  {
    id: "1",
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    description: "Titanium. Sangat kuat. Sangat ringan. Sangat Pro.",
    descriptionEN: "Titanium. So strong. So light. So Pro.",
    price: 18999000,
    originalPrice: 20999000,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Terlaris",
    badgeEN: "Best Seller",
    category: "Smartphone",
    imageUrl: "/images/iphone_15_pro.png",
    images: [
      "/images/iphone_15_pro.png",
      "/images/iphone_15_pro.jpeg",
      "/images/15_pro2.jpg",
      "/images/apple_iphone_15_pro_black_titanium_1_4.jpeg",
      "/images/apple_iphone_15_pro_white_titanium_1_4.jpeg"
    ],
    heroImageUrl: "/images/placeholder.svg",
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    specs: {
      screen: "6.1-inch Super Retina XDR display",
      chip: "A17 Pro chip",
      camera: "Pro camera system (48MP Main, 12MP Ultra Wide)",
      battery: "Up to 23 hours video playback"
    }
  },

  // Samsung
  {
    id: "7",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    description: "Galaxy AI is here. Welcome to the era of mobile AI.",
    descriptionEN: "Galaxy AI is here. Welcome to the era of mobile AI.",
    price: 21999000,
    originalPrice: 23999000,
    rating: 4.9,
    reviewsCount: 118,
    badge: "Flagship",
    badgeEN: "Flagship",
    category: "Smartphone",
    imageUrl: "/images/galaxy-s24-ultra-highlights-color-titanium-gray-back_A8i6.jpg",
    images: [
      "/images/galaxy-s24-ultra-highlights-color-titanium-gray-back_A8i6.jpg",
      "/images/galaxy-s24-ultra-highlights-color-titanium-gray-side_A8i6.jpg",
      "/images/galaxy-s24-ultra-highlights-color-titanium-black-back_A8i6.jpg",
      "/images/galaxy-s24-ultra-highlights-color-titanium-black-side_A8i6.jpg",
      "/images/galaxy-s24-ultra-highlights-color-titanium-violet-back_A8i6.jpg",
      "/images/galaxy-s24-ultra-highlights-color-titanium-violet-side_A8i6.jpg",
      "/images/galaxy-s24-ultra-highlights-color-titanium-yellow-back_A8i6.jpg",
      "/images/galaxy-s24-ultra-highlights-color-titanium-yellow-side_A8i6.jpg",
      "/images/galaxy-s24-ultra-highlights-color-titanium-blue-back_A8i6.jpg",
      "/images/galaxy-s24-ultra-highlights-color-titanium-blue-side_A8i6.jpg",
      "/images/galaxy-s24-ultra-highlights-color-titanium-green-back_A8i6.jpg",
      "/images/galaxy-s24-ultra-highlights-color-titanium-green-side_A8i6.jpg",
      "/images/galaxy-s24-ultra-highlights-color-titanium-orange-back_A8i6.jpg",
      "/images/galaxy-s24-ultra-highlights-color-titanium-orange-side_A8i6.jpg"
    ],
    heroImageUrl: "/images/placeholder.svg",
    colors: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"],
    specs: {
      screen: "6.8-inch Dynamic AMOLED 2X",
      chip: "Snapdragon 8 Gen 3 for Galaxy",
      camera: "200MP Main, 50MP Telephoto",
      battery: "5000 mAh"
    }
  },
  
  // Xiaomi
  {
    id: "8",
    name: "Xiaomi 17",
    slug: "xiaomi-17",
    description: "Leica optics. Mengabadikan momen legendaris.",
    descriptionEN: "Leica optics. Capturing legendary moments.",
    price: 11999000,
    originalPrice: 12999000,
    rating: 4.8,
    reviewsCount: 89,
    badge: "Promo",
    badgeEN: "Sale",
    category: "Smartphone",
    imageUrl: "/images/xiaomi17.png",
    images: [
      "/images/xiaomi17.png",
      "/images/Xiaomi-17-Black.jpeg",
      "/images/xiaomi_17_alpine_pink_1.jpeg",
      "/images/xiaomi_17_blue.jpg",
      "/images/xiaomi_17_venturegreenj.png"
    ],
    heroImageUrl: "/images/placeholder.svg",
    colors: ["Black", "White", "Rock Blue"],
    specs: {
      screen: "6.36-inch 1.5K AMOLED 120Hz",
      chip: "Snapdragon 8 Gen 3",
      camera: "Leica 50MP Triple Camera",
      battery: "4610 mAh dengan 90W HyperCharge"
    }
  },

  // Oppo
  {
    id: "9",
    name: "OPPO Find N3 Flip",
    slug: "oppo-find-n3-flip",
    description: "Gaya di setiap lipatan. Hasselblad Camera untuk mobile.",
    descriptionEN: "Style in every fold. Hasselblad Camera for mobile.",
    price: 15999000,
    originalPrice: 16999000,
    rating: 4.8,
    reviewsCount: 64,
    badge: "Populer",
    badgeEN: "Popular",
    category: "Smartphone",
    imageUrl: "/images/find-n3-flip.png",
    images: [
      "/images/find-n3-flip.png",
      "/images/find-n3-flip-427_600-gold.png",
      "/images/find_oppo_n3_flip_black.jpg",
      "/images/oppo_find_n3_flip_misty_pink1.jpg"
    ],
    colors: ["Cream Gold", "Misty Pink", "Sleek Black"],
    specs: {
      screen: "6.8-inch Foldable LTPO AMOLED",
      chip: "MediaTek Dimensity 9200",
      camera: "50MP Main + 48MP Ultrawide + 32MP Telephoto",
      battery: "4300 mAh dengan 44W SUPERVOOC"
    }
  },

  // Vivo
  {
    id: "10",
    name: "vivo X100 Pro",
    slug: "vivo-x100-pro",
    description: "Fotografi profesional di genggaman Anda hasil kerja sama ZEISS.",
    descriptionEN: "Professional photography in your hands, co-engineered with ZEISS.",
    price: 16999000,
    originalPrice: 17999000,
    rating: 4.8,
    reviewsCount: 52,
    badge: "Kamera Pro",
    badgeEN: "Pro Camera",
    category: "Smartphone",
    imageUrl: "/images/Vivo-X100-Pro-all.jpg",
    images: [
      "/images/Vivo-X100-Pro-all.jpg",
      "/images/vivo_x100_pro_asteroid_black_1.jpg",
      "/images/vivo-x100s-pro-5g-v2324ha-dual-sim-1tb-white-16gb-ram-china-version.jpg",
      "/images/56929-vivo-x100-pro-blue.jpg",
      "/images/vivo-x100-pro-orange.jpg"
    ],
    colors: ["Asteroid Black", "Startrail Blue", "Sunset Orange"],
    specs: {
      screen: "6.78-inch LTPO AMOLED",
      chip: "MediaTek Dimensity 9300",
      camera: "ZEISS 50MP Main + 50MP APO Telephoto + 50MP Ultrawide",
      battery: "5400 mAh dengan 100W FlashCharge"
    }
  },

  // Samsung Tablet
  {
    id: "11",
    name: "Samsung Galaxy Tab S11",
    slug: "samsung-galaxy-tab-s11",
    description: "Tablet revolusioner dengan layar memukau dan performa tiada banding.",
    descriptionEN: "Revolutionary tablet with stunning display and unparalleled performance.",
    price: 14999000,
    originalPrice: 15999000,
    rating: 4.9,
    reviewsCount: 47,
    badge: "Baru",
    badgeEN: "New",
    category: "Tablet",
    imageUrl: "/images/samsung_galaxy_tab_s11_ultra_5g_gray_1.webp",
    images: [
      "/images/samsung_galaxy_tab_s11_ultra_5g_gray_1.webp"
    ],
    colors: ["Graphite", "Beige", "Silver"],
    specs: {
      screen: "11-inch Dynamic AMOLED 2X",
      chip: "Snapdragon 8 Gen 4 for Galaxy",
      camera: "13MP Main + 8MP Ultrawide",
      battery: "8400 mAh"
    }
  },

  // Apple Watch
  {
    id: "12",
    name: "Apple Watch Series 10",
    slug: "apple-watch-series-10",
    description: "Layar lebih besar dengan desain tertipis. Fitur kesehatan & kebugaran tercanggih.",
    descriptionEN: "Bigger display with our thinnest design yet. Advanced health & fitness insights.",
    price: 7999000,
    originalPrice: 8499000,
    rating: 4.9,
    reviewsCount: 93,
    badge: "Baru",
    badgeEN: "New",
    category: "Smartwatch",
    imageUrl: "/images/apple_watch_series_10.jpg",
    images: [
      "/images/apple_watch_series_10.jpg"
    ],
    colors: ["Jet Black", "Rose Gold", "Silver"],
    specs: {
      screen: "Wide-angle OLED Retina Display",
      chip: "S10 SiP with 64-bit dual-core",
      camera: "ECG, Blood Oxygen, Sleep Apnea detection",
      battery: "Up to 18 hours (36 hours Low Power)"
    }
  },

  // AirPods Pro
  {
    id: "13",
    name: "AirPods Pro (Gen 2)",
    slug: "airpods-pro-2",
    description: "Peredam Kebisingan Aktif hingga 2x lebih baik dengan Audio Spasial personal.",
    descriptionEN: "Up to 2x more Active Noise Cancellation with personalized Spatial Audio.",
    price: 3899000,
    originalPrice: 4299000,
    rating: 4.9,
    reviewsCount: 215,
    badge: "Audio Pilihan",
    badgeEN: "Top Audio",
    category: "Audio",
    imageUrl: "/images/airpods-pro-2.png",
    images: [
      "/images/airpods-pro-2.png"
    ],
    colors: ["White"],
    specs: {
      screen: "MagSafe Charging Case (USB-C)",
      chip: "Apple H2 headphone chip",
      camera: "Adaptive Audio & Transparency mode",
      battery: "Up to 6 hours listening time (30 hours with case)"
    }
  },

  // Aksesoris 1
  {
    id: "14",
    name: "Apple 20W USB-C Power Adapter",
    slug: "apple-20w-usbc-adapter",
    description: "Pengisian daya cepat & efisien untuk iPhone, iPad, dan Apple Watch.",
    descriptionEN: "Fast, efficient charging at home, in the office, or on the go.",
    price: 449000,
    originalPrice: 499000,
    rating: 4.9,
    reviewsCount: 340,
    badge: "Wajib Punya",
    badgeEN: "Must Have",
    category: "Aksesoris",
    imageUrl: "/images/apple-20w-adapter.jpg",
    images: [
      "/images/apple-20w-adapter.jpg"
    ],
    colors: ["White"],
    specs: {
      screen: "20W Fast Charging",
      chip: "USB Power Delivery 3.0",
      camera: "Proteksi Overheat & Overcharge",
      battery: "Input 100-240V ~ 50/60Hz"
    }
  },

  // Aksesoris 2
  {
    id: "15",
    name: "Apple MagSafe Charger",
    slug: "apple-magsafe-charger",
    description: "Pengisian daya nirkabel magnetik cepat hingga 15W yang presisi dan aman.",
    descriptionEN: "Faster magnetic wireless charging up to 15W with perfectly aligned magnets.",
    price: 899000,
    originalPrice: 999000,
    rating: 4.8,
    reviewsCount: 180,
    badge: "Wireless Fast",
    badgeEN: "Wireless Fast",
    category: "Aksesoris",
    imageUrl: "/images/magsafe-charger.jpg",
    images: [
      "/images/magsafe-charger.jpg"
    ],
    colors: ["Silver"],
    specs: {
      screen: "Konektor Terintegrasi USB-C 1m",
      chip: "Qi Wireless Standard Compatible",
      camera: "Daya rekat magnetik kuat",
      battery: "Hingga 15W pengisian nirkabel"
    }
  }
];

