import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 13000;
  & > section {
    width: 75%;
    margin: 0 auto;
    background-color: #f3f3f3;
    padding: 20px 0;
    position: relative;
    & > .close {
      position: absolute;
      right: 0;
      top: 0;
      bottom: auto;
      left: auto;
      font-size: 20px;
    }
    & > .container {
      max-width: 90%;
      margin: 0 auto;
    }
  }
`;

const Modal = (props) => {
  let { closeModal } = props;
  return(
    <ModalStyle>
      <section>
        <button className="close" onClick={() => closeModal()}>
          &times;
        </button>
        <div className="container">
          {props.children}
        </div>
      </section>
    </ModalStyle>
  )   
}

export default Modal;