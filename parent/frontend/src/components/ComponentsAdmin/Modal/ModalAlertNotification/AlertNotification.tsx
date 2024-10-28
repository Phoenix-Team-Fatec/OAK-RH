import React from "react";
import "./AlertNotification.css";

interface AlertNotificationProps {
  message: string;
  onClose: () => void;
  open: boolean;
}

const AlertNotification: React.FC<AlertNotificationProps> = ({
  message,
  onClose,
  open,
}) => {
  if (!open) return null;

  return (
    <div className="alert-notification">
      <span className="alert-icon">¡</span>
      <p>{message}</p>
      <button className="close-button-alert-notification" onClick={onClose}>
        ✖
      </button>
    </div>
  );
};

export default AlertNotification;
