import React, { createContext, useState, useContext } from 'react';

export const CoinStateContext = createContext();
export const useCoinState = () => useContext(CoinStateContext);

const CoinStateProvider = ({children}) => {
    const [coinDisplay, setCoinDisplay] = useState('BTC');

    return (
        <CoinStateContext.Provider value={{coinDisplay, setCoinDisplay}}>
            {children}
        </CoinStateContext.Provider>
    )
};

export default CoinStateProvider;