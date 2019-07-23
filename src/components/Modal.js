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
  animation: fadein 300ms;
  & > section {
    width: 75%;
    margin: 0 auto;
    background-color: #f3f3f3;
    padding: 20px 0;
    position: relative;
    animation: movein 200ms;
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
  @keyframes fadein { from { opacity: 0; } to   { opacity: 1; }}
  @-moz-keyframes fadein { from { opacity: 0; } to { opacity: 1; }}
  @-webkit-keyframes fadein { from { opacity: 0; } to { opacity: 1; }}
  @-ms-keyframes fadein { from { opacity: 0; } to { opacity: 1; }}
  @-o-keyframes fadein { from { opacity: 0; } to { opacity: 1; }}
  @keyframes movein { from { transform: translateY(-40px); } to { transform: translateY(0) }}

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