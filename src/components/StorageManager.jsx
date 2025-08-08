import React, { useState, useEffect } from 'react';
import { manageStorageQuota } from '../utils/validation';
import styles from '../styles/StorageManager.module.css';

export default function StorageManager({ onClose }) {
  const [storageInfo, setStorageInfo] = useState({
    used: 0,
    available: 0,
    percentage: 0
  });
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    calculateStorageUsage();
  }, []);

  const calculateStorageUsage = () => {
    try {
      let totalSize = 0;
      const keys = Object.keys(localStorage);
      
      keys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
          totalSize += new Blob([value]).size;
        }
      });

      // Estimate available storage (browsers typically have 5-10MB limit)
      const estimatedAvailable = 5 * 1024 * 1024; // 5MB
      const percentage = Math.min((totalSize / estimatedAvailable) * 100, 100);

      setStorageInfo({
        used: totalSize,
        available: estimatedAvailable,
        percentage: percentage
      });
    } catch (error) {
      console.error('Error calculating storage usage:', error);
    }
  };

  const clearAllData = () => {
    if (window.confirm('This will clear all your saved data including orders and designs. Are you sure?')) {
      setIsClearing(true);
      
      try {
        // Clear all localStorage data
        localStorage.clear();
        
        // Recalculate storage
        calculateStorageUsage();
        
        alert('All data cleared successfully!');
        onClose();
      } catch (error) {
        console.error('Error clearing data:', error);
        alert('Error clearing data. Please try again.');
      } finally {
        setIsClearing(false);
      }
    }
  };

  const clearDesignsOnly = () => {
    if (window.confirm('This will clear only your saved design previews. Are you sure?')) {
      setIsClearing(true);
      
      try {
        // Clear design-related data
        localStorage.removeItem('adscreenhub_design');
        
        // Recalculate storage
        calculateStorageUsage();
        
        alert('Design data cleared successfully!');
      } catch (error) {
        console.error('Error clearing design data:', error);
        alert('Error clearing design data. Please try again.');
      } finally {
        setIsClearing(false);
      }
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStorageColor = (percentage) => {
    if (percentage < 50) return '#10b981'; // Green
    if (percentage < 80) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Storage Management</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.storageInfo}>
            <h3>Storage Usage</h3>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ 
                  width: `${storageInfo.percentage}%`,
                  backgroundColor: getStorageColor(storageInfo.percentage)
                }}
              ></div>
            </div>
            <div className={styles.storageDetails}>
              <span>Used: {formatBytes(storageInfo.used)}</span>
              <span>Available: {formatBytes(storageInfo.available)}</span>
              <span>{storageInfo.percentage.toFixed(1)}% used</span>
            </div>
          </div>

          <div className={styles.warning}>
            <p>
              <strong>Storage Limit:</strong> Browsers have a storage limit of approximately 5-10MB. 
              Large images and accumulated data can cause storage errors.
            </p>
          </div>

          <div className={styles.actions}>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={clearDesignsOnly}
              disabled={isClearing}
            >
              {isClearing ? 'Clearing...' : 'Clear Design Previews Only'}
            </button>
            
            <button 
              className={`${styles.btn} ${styles.btnDanger}`}
              onClick={clearAllData}
              disabled={isClearing}
            >
              {isClearing ? 'Clearing...' : 'Clear All Data'}
            </button>
          </div>

          <div className={styles.tips}>
            <h4>Tips to reduce storage usage:</h4>
            <ul>
              <li>Use smaller image files (under 1MB)</li>
              <li>Clear old design previews regularly</li>
              <li>Complete orders to remove temporary data</li>
              <li>Use compressed image formats (JPEG instead of PNG)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
