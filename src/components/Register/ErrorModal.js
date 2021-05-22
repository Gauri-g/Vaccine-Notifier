import "./ErrorModal.css";
import {useState} from "react";
import Modal from 'react-modal';

const ErrorModal = () => {

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  const [modalIsOpen,setIsOpen] = useState(true);
  function closeModal(){
    setIsOpen(false);
  }
    return(
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  ariaHideApp={false}
                  contentLabel="Example Modal"
                >
                  <div className="text">Icon</div>
                  <div className="text">You have succesfully registered for the COWIN notifier.</div>
                  <div className="text">Make sure to keep an eye on your slots!</div>
                  <button onClick={closeModal} className="button text">close</button>
                </Modal>
    );
}

export default ErrorModal;
