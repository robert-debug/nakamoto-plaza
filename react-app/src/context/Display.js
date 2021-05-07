import React, { createContext, useState, useContext } from 'react';

export const DisplayStateContext = createContext();
export const useDisplayState = () => useContext(DisplayStateContext);

const DisplayStateProvider = ({children}) => {
    const [showDisplay, setShowDisplay] = useState('Home');

    return (
        <DisplayStateContext.Provider value={{showDisplay, setShowDisplay}}>
            {children}
        </DisplayStateContext.Provider>
    )
};

export default DisplayStateProvider;
