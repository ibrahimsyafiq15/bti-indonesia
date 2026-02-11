import { useEffect } from 'react';

function SuccessModal({ isOpen, onClose, title, message }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Checkmark Icon */}
        <div style={iconContainerStyle}>
          <i className="fas fa-check-circle" style={checkmarkIconStyle}></i>
        </div>

        {/* Title */}
        <h3 style={titleStyle}>{title}</h3>

        {/* Message */}
        <p style={messageStyle}>{message}</p>

        {/* Close Button */}
        <button onClick={onClose} style={closeButtonStyle}>
          Close
        </button>
      </div>
    </div>
  );
}

// Styles
const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '20px'
};

const modalStyle = {
  background: 'white',
  borderRadius: '12px',
  padding: '32px',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  animation: 'modalSlideIn 0.3s ease-out'
};

const iconContainerStyle = {
  marginBottom: '16px'
};

const checkmarkIconStyle = {
  fontSize: '64px',
  color: '#03D967'
};

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#1a1a2e',
  margin: '0 0 12px 0'
};

const messageStyle = {
  fontSize: '1rem',
  color: '#6b6b7b',
  margin: '0 0 24px 0',
  lineHeight: '1.5'
};

const closeButtonStyle = {
  padding: '12px 32px',
  background: '#03D967',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  fontSize: '1rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background 0.2s'
};

export default SuccessModal;
