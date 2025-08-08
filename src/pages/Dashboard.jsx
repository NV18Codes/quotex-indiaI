import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';
import { mockScreens, mockPlans } from '../data/mockData';
import { isDateDisabled, validateFile, generateOrderId } from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const { user } = useAuth();
  const { createOrder, isScreenBooked, getBookedScreensForDate } = useOrders(user?.id);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showScreenModal, setShowScreenModal] = useState(false);
  const [designFile, setDesignFile] = useState(null);
  const [designPreview, setDesignPreview] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [newOrder, setNewOrder] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedScreen(null);
    setSelectedPlan(null);
  };

  const handleScreenSelect = (screen) => {
    // Check if screen is already booked for selected date
    if (selectedDate && isScreenBooked(screen.id, selectedDate)) {
      alert('This screen is already booked for the selected date. Please choose another date or screen.');
      return;
    }
    setSelectedScreen(screen);
    setShowScreenModal(true);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  // Load saved design from localStorage
  useEffect(() => {
    const savedDesign = localStorage.getItem('adscreenhub_design');
    if (savedDesign) {
      setDesignPreview(savedDesign);
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 15 * 1024 * 1024; // 15MB

    const validation = validateFile(file, allowedTypes, maxSize);
    
    if (!validation.isValid) {
      setUploadError(validation.errors.type || validation.errors.size);
      return;
    }

    setUploadError('');
    setDesignFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target.result;
      setDesignPreview(preview);
      // Save to localStorage
      localStorage.setItem('adscreenhub_design', preview);
    };
    reader.readAsDataURL(file);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedScreen || !selectedPlan) {
      alert('Please select date, screen, and plan');
      return;
    }
    setShowUploadModal(true);
  };

  const handleConfirmBooking = () => {
    if (!designFile) {
      alert('Please upload your design first');
      return;
    }

    // Show warning modal first
    setShowWarningModal(true);
  };

  const handleAcceptWarning = () => {
    setShowWarningModal(false);
    
    // Create new order
    const orderData = {
      screenId: selectedScreen.id,
      planId: selectedPlan.id,
      displayDate: selectedDate,
      designFile: designFile.name,
      supportingDoc: null,
      totalAmount: selectedPlan.price,
      thumbnail: designPreview
    };

    const result = createOrder(orderData);
    
    if (result.success) {
      setNewOrder(result.order);
      setShowConfirmation(true);
      setShowUploadModal(false);
      setShowScreenModal(false);
      
      // Reset form
      setSelectedDate('');
      setSelectedScreen(null);
      setSelectedPlan(null);
      setDesignFile(null);
      setDesignPreview(null);
      
      // Clear localStorage
      localStorage.removeItem('adscreenhub_design');
    } else {
      alert('Failed to create order. Please try again.');
    }
  };

  // Get minimum date (today + 2 days)
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 2);
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Welcome back, {user?.fullName}!</h1>
          <p>Book your LED screen advertising campaign</p>
        </div>

        <div className={styles.bookingSection}>
                     <div className={styles.dateSection}>
             <h2>Select Display Date</h2>
             <div className={styles.dateInputWrapper}>
               <svg className={styles.calendarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <input
                 type="date"
                 value={selectedDate}
                 onChange={handleDateChange}
                 min={minDateString}
                 className={styles.dateInput}
               />
             </div>
             <p className={styles.dateNote}>
               Note: Bookings must be made at least 2 days in advance
             </p>
           </div>

          {selectedDate && (
            <div className={styles.screensSection}>
              <h2>Choose Your LED Screen</h2>
              <div className={styles.screensGrid}>
                {mockScreens.map((screen) => {
                  const isBooked = selectedDate && isScreenBooked(screen.id, selectedDate);
                  return (
                    <div
                      key={screen.id}
                      className={`${styles.screenCard} ${isBooked ? styles.booked : ''}`}
                      onClick={() => handleScreenSelect(screen)}
                    >
                      <img src={screen.image} alt={screen.name} className={styles.screenImage} />
                      <div className={styles.screenInfo}>
                        <h3>{screen.name}</h3>
                        <p className={styles.screenLocation}>{screen.location}</p>
                        <p className={styles.screenSize}>{screen.size}</p>
                        <p className={styles.screenPixels}>{screen.pixels}</p>
                        <p className={styles.screenPrice}>Starting at ₹{screen.price}</p>
                        {isBooked && (
                          <div className={styles.bookedBadge}>
                            <span>Booked for {selectedDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Screen Selection Modal */}
        {showScreenModal && selectedScreen && (
          <div className={styles.modalOverlay} onClick={() => setShowScreenModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.modalClose}
                onClick={() => setShowScreenModal(false)}
              >
                ×
              </button>
              
              <div className={styles.modalHeader}>
                <h2>{selectedScreen.name}</h2>
                <p>{selectedScreen.description}</p>
              </div>

              <div className={styles.screenDetails}>
                <img src={selectedScreen.image} alt={selectedScreen.name} />
                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <strong>Location:</strong> {selectedScreen.location}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Size:</strong> {selectedScreen.size}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Resolution:</strong> {selectedScreen.pixels}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Orientation:</strong> {selectedScreen.orientation}
                  </div>
                </div>
              </div>

              <div className={styles.plansSection}>
                <h3>Select Your Plan</h3>
                <div className={styles.plansGrid}>
                  {mockPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`${styles.planCard} ${
                        selectedPlan?.id === plan.id ? styles.selected : ''
                      }`}
                      onClick={() => handlePlanSelect(plan)}
                    >
                      <h4>{plan.name}</h4>
                      <div className={styles.planPrice}>₹{plan.price}</div>
                      <div className={styles.planDuration}>{plan.duration}</div>
                      <ul className={styles.planFeatures}>
                        {plan.features.slice(0, 3).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {selectedPlan && (
                <div className={styles.bookingSummary}>
                  <h3>Booking Summary</h3>
                  <div className={styles.summaryItem}>
                    <span>Screen:</span> <span>{selectedScreen.name}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Plan:</span> <span>{selectedPlan.name}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Date:</span> <span>{selectedDate}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Total:</span> <span>₹{selectedPlan.price}</span>
                  </div>
                  
                  <button
                    onClick={handleBooking}
                    className={`${styles.btn} ${styles.btnPrimary}`}
                  >
                    Continue to Upload Design
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Design Upload Modal */}
        {showUploadModal && (
          <div className={styles.modalOverlay} onClick={() => setShowUploadModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.modalClose}
                onClick={() => setShowUploadModal(false)}
              >
                ×
              </button>
              
              <div className={styles.modalHeader}>
                <h2>Upload Your Design</h2>
                <p>Please upload your advertisement design (JPG, PNG formats only, max 15MB)</p>
              </div>

              <div className={styles.uploadSection}>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className={styles.fileInput}
                  id="design-upload"
                />
                <label htmlFor="design-upload" className={styles.fileInputLabel}>
                  <div className={styles.uploadArea}>
                    <svg className={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p>Click to upload or drag and drop</p>
                    <p className={styles.fileTypes}>JPG, PNG (max 15MB)</p>
                  </div>
                </label>

                {uploadError && (
                  <div className={styles.errorMessage}>
                    {uploadError}
                  </div>
                )}

                {designPreview && (
                  <div className={styles.previewSection}>
                    <h3>Design Preview</h3>
                    <img src={designPreview} alt="Design Preview" className={styles.previewImage} />
                    <p className={styles.fileInfo}>
                      File: {designFile?.name} ({(designFile?.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.modalActions}>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={!designFile}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Warning Modal */}
        {showWarningModal && (
          <div className={styles.modalOverlay} onClick={() => setShowWarningModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.modalClose}
                onClick={() => setShowWarningModal(false)}
              >
                ×
              </button>
              
              <div className={styles.warningHeader}>
                <h2>Important Notice</h2>
                <p>Please read the following terms before proceeding with your order:</p>
              </div>

              <div className={styles.warningContent}>
                <div className={styles.warningSection}>
                  <h3>English</h3>
                  <p>Please ensure your content complies with our advertising guidelines. Inappropriate content will be rejected.</p>
                </div>
                
                <div className={styles.warningSection}>
                  <h3>ಕನ್ನಡ</h3>
                  <p>ದಯವಿಟ್ಟು ನಿಮ್ಮ ವಿಷಯವು ನಮ್ಮ ಜಾಹೀರಾತು ಮಾರ್ಗದರ್ಶನಗಳಿಗೆ ಅನುಗುಣವಾಗಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ಅನುಚಿತ ವಿಷಯವನ್ನು ತಿರಸ್ಕರಿಸಲಾಗುತ್ತದೆ.</p>
                </div>
              </div>

              <div className={styles.warningActions}>
                <button
                  onClick={() => setShowWarningModal(false)}
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAcceptWarning}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  I Accept & Proceed
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Booking Confirmation Modal */}
        {showConfirmation && newOrder && (
          <div className={styles.modalOverlay} onClick={() => setShowConfirmation(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.modalClose}
                onClick={() => setShowConfirmation(false)}
              >
                ×
              </button>
              
              <div className={styles.confirmationHeader}>
                <div className={styles.successIcon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2>Booking Confirmed!</h2>
                <p>Your advertisement has been successfully booked and is pending approval.</p>
              </div>

              <div className={styles.orderDetails}>
                <h3>Order Details</h3>
                <div className={styles.orderInfo}>
                  <div className={styles.orderItem}>
                    <span>Order ID:</span>
                    <span className={styles.orderId}>{newOrder.id}</span>
                  </div>
                  <div className={styles.orderItem}>
                    <span>Screen:</span>
                    <span>{mockScreens.find(s => s.id === newOrder.screenId)?.name}</span>
                  </div>
                  <div className={styles.orderItem}>
                    <span>Plan:</span>
                    <span>{mockPlans.find(p => p.id === newOrder.planId)?.name}</span>
                  </div>
                  <div className={styles.orderItem}>
                    <span>Display Date:</span>
                    <span>{new Date(newOrder.displayDate).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.orderItem}>
                    <span>Total Amount:</span>
                    <span className={styles.orderAmount}>₹{newOrder.totalAmount}</span>
                  </div>
                  <div className={styles.orderItem}>
                    <span>Status:</span>
                    <span className={styles.statusPending}>{newOrder.status}</span>
                  </div>
                </div>

                {newOrder.thumbnail && (
                  <div className={styles.designPreview}>
                    <h4>Your Design</h4>
                    <img src={newOrder.thumbnail} alt="Design Preview" className={styles.previewImage} />
                  </div>
                )}
              </div>

                             <div className={styles.confirmationActions}>
                 <button
                   onClick={() => {
                     setShowConfirmation(false);
                     navigate('/my-orders');
                   }}
                   className={`${styles.btn} ${styles.btnPrimary}`}
                 >
                   View My Orders
                 </button>
                 <button
                   onClick={() => {
                     setShowConfirmation(false);
                     // Reset everything for new booking
                     setNewOrder(null);
                   }}
                   className={`${styles.btn} ${styles.btnSecondary}`}
                 >
                   Book Another Ad
                 </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
