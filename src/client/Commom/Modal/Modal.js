import "./Modal.css";
import ModalContent from "./ModalContent";

const Modal = ({
  open,
  onClose,
  modalTitle,
  setModalTitle,
  formName,
  setFormName,
  setIsSignIn,
  setIsAdmin,
  setCartChanged,
}) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <div className="close-btn" onClick={onClose}>
          X
        </div>
        <div className="title">{modalTitle}</div>
        <ModalContent
          open={open}
          onClose={onClose}
          setModalTitle={setModalTitle}
          formName={formName}
          setFormName={setFormName}
          setIsSignIn={setIsSignIn}
          setIsAdmin={setIsAdmin}
          setCartChanged={setCartChanged}
        />
      </div>
    </div>
  );
};

export default Modal;
