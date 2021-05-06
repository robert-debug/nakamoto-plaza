import React, { createContext, useState, useContext } from 'react';

export const ModalStateContext = createContext();
export const useModalState = () => useContext(ModalStateContext);

const ModalStateProvider = ({children}) => {
    const [showState, setShowState] = useState();
    const closeModal = () => {
        setShowState(false)
    };

    return (
        <ModalStateContext.Provider value={{showState, closeModal}}>
            {children}
        </ModalStateContext.Provider>
    )
};

export default ModalStateProvider;
