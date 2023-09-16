import React, { createContext, useContext, useState } from 'react';

const DateContext = createContext();

export const useDate = () => {
    return useContext(DateContext);
};

export const DateProvider = ({ children }) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const value = {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
    };

    return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};