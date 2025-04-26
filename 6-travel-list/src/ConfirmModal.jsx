import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// Modal component using React Portal
function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    // Find or create modal root element
    let element = document.getElementById("modal-root");
    if (!element) {
      element = document.createElement("div");
      element.id = "modal-root";
      document.body.appendChild(element);
    }
    setModalRoot(element);

    // Cleanup
    return () => {
      if (element.childNodes.length === 0) {
        document.body.removeChild(element);
      }
    };
  }, []);

  if (!isOpen || !modalRoot) return null;

  // Use React Portal to render outside the main component hierarchy
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-popover">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="confirm" onClick={onConfirm}>
            Yes, Confirm
          </button>
          <button className="cancel" onClick={onClose}>
            No, Cancel
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default ConfirmModal;
