// OpenCardProvider.js

import React, { useState, useContext } from 'react';
import { OpenCardContext } from './OpenCardContext';

export const OpenCardProvider = ({ children }) => {
  const [openCardId, setOpenCardId] = useState(null);

  return (
    <OpenCardContext.Provider value={{ openCardId, setOpenCardId }}>
      {children}
    </OpenCardContext.Provider>
  );
};

export const useOpenCard = () => {
  return useContext(OpenCardContext);
};
