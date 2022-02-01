import React, { useRef, useState, useEffect, useContext } from "react";
import { ReactDOM } from "react";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal({ onclose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div>
            <div id='background' onClick={onclose} />
            <div id='content'></div>
            {children}
        </div>,
        modalNode
    );
}
