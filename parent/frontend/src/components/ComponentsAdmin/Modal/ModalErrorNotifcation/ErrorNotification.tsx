import React, { useEffect } from 'react';
import './ErrorNotification.css';

interface ErrorNotificationProps {
  message: string;
  onClose: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="error-notification">
      <div className="error-icon">
        <span className="error-exclamation">!</span>
      </div>
      <span>{message}</span>
    </div>
  );
};

export default ErrorNotification;
