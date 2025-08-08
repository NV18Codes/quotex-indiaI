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
  const mobileRegex = /^\+91\s[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
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
