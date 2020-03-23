import React from 'react';

interface Props {
  children: Object;
  headerText: string;
  closeModal: () => void;
}

const Modal = (props: Props) => {
  const { headerText, closeModal } = props;

  return (
    <div className="modal-overlay" id="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{headerText}</h2>
          <button onClick={e => closeModal()}>Close</button>
        </div>
        <hr></hr>
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
