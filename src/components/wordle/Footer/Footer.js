import './Footer.css'

import Terms from './TermsAndConditions'
import Logo from '../../../assets/logo.webp'
import { useState, useEffect } from 'react'

const Footer = (props) => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => setModalIsOpen(!isModalOpen);
  return (
    <footer style={{ position: "absolute", width: "100%", bottom: 0, background: "#1B132F", }} >
      {isModalOpen && <Modal2 onRequestClose={toggleModal} />}
      <hr />
      <div className='footer_end_l item_point'>
        <a href="https://renderverse.io">
          <img alt="logo" src={Logo} width={"40"} />
        </a>
        <div className='footer_content_links item_point'>
          <div style={{ color: "white" }} onClick={() => toggleModal()}>Terms and condition</div>
          <div style={{ color: "white" }}>© Renderverse 2022</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const Modal2 = ({ onRequestClose }) => {
  // Use useEffect to add an event listener to the document
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        onRequestClose();
      }
    }
    // Prevent scolling
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // Clear things up when unmounting this component
    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("keydown", onKeyDown);
    };
  });


  return (
    <div className="modal__backdrop">
      <div style={{ background: "#0b1118", color: "white", zIndex: 10000, padding: "2rem", margin: "4rem auto", width: "80%", borderRadius: "2vh" }}>
        <Terms />
        <button type="button" className='sbutton' onClick={onRequestClose}>
          Close
        </button>
      </div>
    </div>
  );
};