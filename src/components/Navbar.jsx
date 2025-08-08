import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>AD</div>
          <div className={styles.logoText}>SCREEN HUB</div>
        </Link>

        {/* Desktop Navigation */}
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
          <Link to="/pricing" className={styles.navLink}>Pricing</Link>
          <Link to="/how-it-works" className={styles.navLink}>How It Works?</Link>
          <Link to="/about" className={styles.navLink}>About Us</Link>
          <Link to="/blogs" className={styles.navLink}>Blogs</Link>
          
          {!loading && isAuthenticated ? (
            <div className={styles.authSection}>
              <div className={styles.userMenu}>
                <span className={styles.userName}>Hi, {user?.fullName}</span>
                <div className={styles.dropdown}>
                  <Link to="/dashboard" className={styles.dropdownItem}>Dashboard</Link>
                  <Link to="/my-orders" className={styles.dropdownItem}>My Orders</Link>
                  <Link to="/profile" className={styles.dropdownItem}>Profile</Link>
                  <button onClick={handleLogout} className={styles.dropdownItem}>Logout</button>
                </div>
              </div>
            </div>
          ) : !loading ? (
            <div className={styles.authSection}>
              <Link to="/login" className={`${styles.btn} ${styles.btnSecondary}`}>
                Log In
              </Link>
              <Link to="/signup" className={`${styles.btn} ${styles.btnPrimary}`}>
                Sign Up
              </Link>
            </div>
          ) : null}
        </div>

        {/* Mobile Menu Button */}
        <button className={styles.mobileMenuBtn} onClick={toggleMenu}>
          <span className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}></span>
        </button>
      </div>
    </nav>
  );
}
