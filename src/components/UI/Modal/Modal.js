import React from 'react';
import './Modal.css';
import '../SimpleButton.css';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  
    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
          {children}
          <button onClick={handleClose} className="simpleButton closeModalButton"   >
            Close
          </button>
        </section>
      </div>
    );
  };

export default Modal;