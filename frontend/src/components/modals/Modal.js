import React, {useContext, useState} from 'react';
import './Modal.scss'
import BackDrop from "../../Backdrop";

const Modal = props => {


    const handleCancelClicked = () => {
        props.cancelHandler()
    }

    const handleConfirmClicked = () => {
        props.confirmHandler()
    }
    return (
        <>
            <BackDrop/>
            <div className="modal">
                <header className="modal_header">
                    <h1>{props.title}</h1>
                </header>
                <section className="modal_contents">
                    {props.children}
                </section>
                <section className="modal_actions">
                    <button className="btn" onClick={handleCancelClicked}>Cancel</button>
                    <button className="btn" onClick={handleConfirmClicked}>{props.confrimText}</button>
                </section>
            </div>
        </>
    )

}

export default Modal;
