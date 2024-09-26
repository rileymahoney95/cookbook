import React from 'react';
import styles from './form-success.module.css';

interface SuccessDialogProps {
  onClose: () => void;
}

export default function SuccessDialog({ onClose }: SuccessDialogProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2 className={styles.title}>Success!</h2>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
