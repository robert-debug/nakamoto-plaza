import React, { createContext, useState, useContext } from 'react';

export const ChartStateContext = createContext();
export const useChartState = () => useContext(ChartStateContext);

const ChartStateProvider = ({children}) => {
    const [chartDisplay, setChartDisplay] = useState('1h');

    return (
        <ChartStateContext.Provider value={{chartDisplay, setChartDisplay}}>
            {children}
        </ChartStateContext.Provider>
    )
};

export default ChartStateProvider;