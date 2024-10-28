import React, { useEffect } from 'react';
import './SuccessNotification.css';

interface SuccessNotificationProps {
  message: string;
  onClose: () => void;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-notification">
      <div className="success-icon">✔</div>
      <span>{message}</span>
    </div>
  );
};

export default SuccessNotification;
