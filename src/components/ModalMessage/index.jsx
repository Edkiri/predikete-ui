import React from "react";

import "./styles.css";

export const ModalMessage = ({ title, message, closeModal }) => {
  return (
    <div className="ModalMessageContainer">
      <h4 className="ModalTitle">{title}</h4>
      <p className="ModalMessage">{message}</p>
      <button onClick={closeModal}>Ok</button>
    </div>
  );
};
