import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Custom hook for managing modal state
 * @param {Object} options - Configuration options
 * @param {number} [options.autoClose] - Auto-close timeout in milliseconds
 * @returns {Object} Modal state and control functions
 * @returns {boolean} isOpen - Whether the modal is currently open
 * @returns {Function} openModal - Function to open the modal
 * @returns {Function} closeModal - Function to close the modal
 * @returns {Function} toggleModal - Function to toggle the modal state
 */
export function useModal(options = {}) {
  const { autoClose } = options;
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Handle auto-close functionality
  useEffect(() => {
    if (isOpen && autoClose && autoClose > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, autoClose);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isOpen, autoClose]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
}

export default useModal;
