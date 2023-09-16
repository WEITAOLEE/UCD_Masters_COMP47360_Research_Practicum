import React from 'react';

// Create LocatorContext
export const LocatorContext = React.createContext();

// Create LocatorProvider component
export const LocatorProvider = ({ children }) => {
  const [showLocator, setShowLocator] = React.useState(false);

  return (
    <LocatorContext.Provider value={{ showLocator, setShowLocator }}>
      {children}
    </LocatorContext.Provider>
  );
};
