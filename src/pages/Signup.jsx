import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword, validateMobile } from '../utils/validation';
import styles from '../styles/Auth.module.css';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: form, 2: OTP
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '+91',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let processedValue = value;
    
    // Handle mobile number formatting
    if (name === 'mobile') {
      // Remove all spaces and ensure it starts with +91
      processedValue = value.replace(/\s/g, '');
      if (!processedValue.startsWith('+91')) {
        processedValue = '+91' + processedValue.replace('+91', '');
      }
      // Limit to +91 + 10 digits
      if (processedValue.length > 13) {
        processedValue = processedValue.substring(0, 13);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 'none', text: '', class: '' };
    
    const validation = validatePassword(password);
    if (validation.isValid) {
      return { strength: 'strong', text: 'Strong password', class: styles.strengthStrong };
    } else if (password.length >= 6) {
      return { strength: 'medium', text: 'Medium strength', class: styles.strengthMedium };
    } else {
      return { strength: 'weak', text: 'Weak password', class: styles.strengthWeak };
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.mobile || formData.mobile === '+91') {
      newErrors.mobile = 'Mobile number is required';
    } else if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid Indian mobile number (+91 format)';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = Object.values(passwordValidation.errors).filter(Boolean).join(', ');
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must accept the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate OTP step
      setStep(2);
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    
    if (otp !== '1234') {
      setErrors({ otp: 'Invalid OTP. Please enter 1234.' });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = signup(formData);
      
      if (result.success) {
        // Small delay to ensure state updates properly
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      } else {
        setErrors({ general: result.error });
        setStep(1);
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
      setStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (step === 2) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h1>Verify Your Email</h1>
            <p>We've sent a verification code to {formData.email}</p>
          </div>

          {errors.general && (
            <div className={styles.errorMessage}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleOTPSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <label htmlFor="otp" className={styles.formLabel}>
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`${styles.formInput} ${errors.otp ? styles.error : ''}`}
                placeholder="Enter 1234"
                maxLength="4"
              />
              {errors.otp && <span className={styles.formError}>{errors.otp}</span>}
              <small style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>
                For demo purposes, use OTP: 1234
              </small>
            </div>

            <button
              type="submit"
              disabled={isLoading || !otp}
              className={`${styles.btn} ${styles.btnPrimary} ${isLoading ? styles.loading : ''}`}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          <div className={styles.authFooter}>
            <button
              onClick={() => setStep(1)}
              className={styles.link}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ← Back to Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1>Create Account</h1>
          <p>Join ADSCREENHUB and start advertising today</p>
        </div>

        {errors.general && (
          <div className={styles.errorMessage}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName" className={styles.formLabel}>
              Full Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.fullName ? styles.error : ''}`}
              placeholder="Enter your full name"
            />
            {errors.fullName && <span className={styles.formError}>{errors.fullName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email Address <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
              placeholder="Enter your email"
            />
            {errors.email && <span className={styles.formError}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mobile" className={styles.formLabel}>
              Mobile Number <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`${styles.formInput} ${errors.mobile ? styles.error : ''}`}
              placeholder="+91 9876543210"
            />
            {errors.mobile && <span className={styles.formError}>{errors.mobile}</span>}
            <small style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>
              Only Indian numbers (+91) are supported
            </small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`${styles.formInput} ${errors.password ? styles.error : ''}`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className={styles.formError}>{errors.password}</span>}
            {formData.password && (
              <div className={styles.passwordStrength}>
                <span>{passwordStrength.text}</span>
                <div className={`${styles.strengthBar} ${passwordStrength.class}`}></div>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>
              Confirm Password <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${styles.formInput} ${errors.confirmPassword ? styles.error : ''}`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && <span className={styles.formError}>{errors.confirmPassword}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" className={styles.link}>
                  Terms & Conditions
                </Link>
                {' '}and{' '}
                <Link to="/privacy-policy" className={styles.link}>
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.terms && <span className={styles.formError}>{errors.terms}</span>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.btn} ${styles.btnPrimary} ${isLoading ? styles.loading : ''}`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>
            Already have an account?{' '}
            <Link to="/login" className={styles.link}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
