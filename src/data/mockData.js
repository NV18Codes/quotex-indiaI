// Mock Users Data
export const mockUsers = [
  {
    id: 1,
    fullName: "Test User",
    email: "test@example.com",
    mobile: "+91 9876543210",
    password: "Test@123",
    rememberMe: false
  }
];

// Mock LED Screens Data
export const mockScreens = [
  {
    id: 1,
    name: "MG Road LED Screen",
    image: "/Banner.png",
    size: "20ft x 10ft",
    pixels: "1920x1080",
    orientation: "Landscape",
    location: "MG Road, Bangalore",
    price: 4999,
    description: "High-traffic location in the heart of Bangalore"
  },
  {
    id: 2,
    name: "Koramangala Digital Billboard",
    image: "/Banner.png",
    size: "15ft x 8ft",
    pixels: "1440x720",
    orientation: "Landscape",
    location: "Koramangala, Bangalore",
    price: 3999,
    description: "Popular commercial area with high visibility"
  },
  {
    id: 3,
    name: "Indiranagar LED Display",
    image: "/Banner.png",
    size: "25ft x 12ft",
    pixels: "2560x1280",
    orientation: "Landscape",
    location: "Indiranagar, Bangalore",
    price: 5999,
    description: "Premium location with affluent audience"
  },
  {
    id: 4,
    name: "Whitefield Digital Screen",
    image: "/Banner.png",
    size: "18ft x 9ft",
    pixels: "1600x900",
    orientation: "Landscape",
    location: "Whitefield, Bangalore",
    price: 4499,
    description: "IT corridor with tech-savvy audience"
  }
];

// Mock Plans Data
export const mockPlans = [
  {
    id: 1,
    name: "SPARK",
    price: 4999,
    duration: "1 day",
    adSlots: 700,
    features: [
      "700 ad slots (10 sec/slot)",
      "1 day power play",
      "Quick visibility",
      "Occasion Focussed",
      "Moment Centric"
    ]
  },
  {
    id: 2,
    name: "IMPACT",
    price: 13999,
    duration: "3 days",
    adSlots: 2100,
    features: [
      "2100 ad slots (10 sec/slot)",
      "3 day rapid reach",
      "Awareness Booster",
      "Momentum Gainer",
      "Weekend Blitz"
    ]
  },
  {
    id: 3,
    name: "THRIVE",
    price: 22999,
    duration: "5 days",
    adSlots: 3500,
    features: [
      "3500 ad slots (10 sec/slot)",
      "5 day peak push",
      "Increased Exposure",
      "Lasting Recall",
      "Brand Amplification"
    ]
  }
];

// Mock Orders Data
export const mockOrders = [
  {
    id: "ORD001",
    userId: 1,
    screenId: 1,
    planId: 1,
    orderDate: "2024-01-15",
    displayDate: "2024-01-20",
    status: "Completed Display",
    designFile: "design1.jpg",
    supportingDoc: "doc1.pdf",
    totalAmount: 4999,
    thumbnail: "/Banner.png"
  },
  {
    id: "ORD002",
    userId: 1,
    screenId: 2,
    planId: 2,
    orderDate: "2024-01-10",
    displayDate: "2024-01-25",
    status: "In Display",
    designFile: "design2.jpg",
    supportingDoc: "doc2.pdf",
    totalAmount: 13999,
    thumbnail: "/Banner.png"
  }
];

// Order Status Options
export const orderStatuses = [
  "Pending Approval",
  "In Display",
  "Completed Display",
  "Cancelled Display",
  "Revise Your Design"
];

// File Upload Restrictions
export const uploadRestrictions = {
  design: {
    allowedTypes: ["image/png", "image/jpeg", "image/jpg", "video/mp4"],
    maxSize: 15 * 1024 * 1024, // 15MB
    maxSizeText: "15MB"
  },
  document: {
    allowedTypes: ["image/png", "image/jpeg", "image/jpg", "video/mp4", "application/pdf"],
    maxSize: 10 * 1024 * 1024, // 10MB
    maxSizeText: "10MB"
  }
};

// Warning Messages (English + Kannada)
export const warningMessages = {
  english: "Please ensure your content complies with our advertising guidelines. Inappropriate content will be rejected.",
  kannada: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ವಿಷಯವು ನಮ್ಮ ಜಾಹೀರಾತು ಮಾರ್ಗದರ್ಶನಗಳಿಗೆ ಅನುಗುಣವಾಗಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ಅನುಚಿತ ವಿಷಯವನ್ನು ತಿರಸ್ಕರಿಸಲಾಗುತ್ತದೆ."
};
