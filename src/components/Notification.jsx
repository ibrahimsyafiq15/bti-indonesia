import { useEffect } from 'react';

function Notification({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`bti-notification ${type}`}>
      <i className={`fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}`}></i>
      <span>{message}</span>
    </div>
  );
}

export default Notification;
