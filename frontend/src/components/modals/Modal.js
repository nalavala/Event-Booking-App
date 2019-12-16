import React, {useContext, useState} from 'react';
import './Modal.scss'

const Modal = props => {


    const handleCancelClicked = () => {
        props.cancelHandler()
    }

    const handleConfirmClicked = () => {
        props.confirmHandler()
    }
    return (
    <div className="modal">
        <header className="modal_header"> <h1>{props.title}</h1></header>
        <section className="modal_contents">
            {props.children}
        </section>
        <section className="modal_actions">
            <button onClick={handleCancelClicked}>Cancel</button>
            <button onClick={handleConfirmClicked}>{props.confrimText}</button>
        </section>
    </div>)
}

export default Modal;
