// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (min 8 chars, 1 uppercase, 1 special char)
export const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: minLength && hasUpperCase && hasSpecialChar,
    errors: {
      length: !minLength ? "Password must be at least 8 characters" : "",
      uppercase: !hasUpperCase ? "Password must contain at least 1 uppercase letter" : "",
      special: !hasSpecialChar ? "Password must contain at least 1 special character" : ""
    }
  };
};

// Mobile number validation (India format)
export const validateMobile = (mobile) => {
  // Remove all spaces and validate format +91XXXXXXXXXX (13 characters total)
  const cleanMobile = mobile.replace(/\s/g, '');
  const mobileRegex = /^\+91[6-9]\d{9}$/;
  return mobileRegex.test(cleanMobile);
};

// File validation
export const validateFile = (file, allowedTypes, maxSize) => {
  const isValidType = allowedTypes.includes(file.type);
  const isValidSize = file.size <= maxSize;
  
  return {
    isValid: isValidType && isValidSize,
    errors: {
      type: !isValidType ? "Invalid file type" : "",
      size: !isValidSize ? "File size too large" : ""
    }
  };
};

// Generate unique order ID
export const generateOrderId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 5);
  return `ORD${timestamp}${randomStr}`.toUpperCase();
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format currency (Indian Rupees)
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

// Check if date is disabled (today and tomorrow)
export const isDateDisabled = (date) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const checkDate = new Date(date);
  return checkDate <= tomorrow;
};

// Compress and resize image for storage
export const compressImage = (file, maxWidth = 800, quality = 0.7) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      
      resolve(compressedDataUrl);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Check localStorage quota and clean if needed
export const manageStorageQuota = () => {
  try {
    // Test if we can write to localStorage
    const testKey = 'storage_test';
    const testValue = 'test';
    localStorage.setItem(testKey, testValue);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      // Clean up old data
      cleanupOldData();
      return true;
    }
    return false;
  }
};

// Clean up old data to free space
const cleanupOldData = () => {
  try {
    // Remove old design previews (keep only the latest)
    const designKey = 'adscreenhub_design';
    if (localStorage.getItem(designKey)) {
      localStorage.removeItem(designKey);
    }
    
    // Keep only last 10 orders
    const ordersKey = 'adscreenhub_orders';
    const ordersData = localStorage.getItem(ordersKey);
    if (ordersData) {
      const orders = JSON.parse(ordersData);
      if (orders.length > 10) {
        const recentOrders = orders.slice(-10);
        localStorage.setItem(ordersKey, JSON.stringify(recentOrders));
      }
    }
    
    // Clear any other large data
    const keysToClean = ['adscreenhub_temp', 'adscreenhub_cache'];
    keysToClean.forEach(key => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Storage cleanup failed:', error);
  }
};
