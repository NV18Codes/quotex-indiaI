import React from 'react';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <h1>Profile</h1>
        <p>Welcome, {user?.fullName}!</p>
        <p>Profile management functionality will be implemented here.</p>
      </div>
    </div>
  );
}
