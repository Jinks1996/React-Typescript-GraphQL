import ReactModal from "react-modal";
import "./Modal.styles.css";

interface ModalProps {
  modalState: boolean;
  updateModalState: Function;
  modalButton: boolean;
  modalButtonText: string;
  shouldCloseOnOverlayClick: boolean;
  customStyles?: {
    content: Object;
  };
}

const defaultProps = {
  modalButton: false,
  shouldCloseOnOverlayClick: true,
  modalButtonText: "",
  customStyles: {
    content: {},
  },
};

type DefaultProps = Readonly<typeof defaultProps>;

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    borderRadius: "25px",
    maxWidth: "40em",
    minWidth: "30em",
    minHeight: "10em",
  },
  overlay: {
    background: "#9e9e9e69",
  },
};

const Modal: React.FC<ModalProps & Partial<DefaultProps>> = (props) => {
  customStyles.content = {
    ...customStyles.content,
    ...props.customStyles?.content,
  };

  return (
    <div>
      {props.modalButton && (
        <button
          onClick={() => props.updateModalState()}
          className="edit-button"
        >
          {props.modalButtonText}
        </button>
      )}
      <ReactModal
        isOpen={props.modalState}
        onRequestClose={() => props.updateModalState()}
        shouldCloseOnOverlayClick={props.shouldCloseOnOverlayClick}
        contentLabel="Modal"
        style={customStyles}
      >
        {props.children}
      </ReactModal>
    </div>
  );
};

Modal.defaultProps = defaultProps;
export default Modal;
