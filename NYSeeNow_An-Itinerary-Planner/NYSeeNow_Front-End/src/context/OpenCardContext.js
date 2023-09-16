// OpenCardContext.js

import { createContext } from 'react';

export const OpenCardContext = createContext({
    openCardId: null,
    setOpenCardId: () => {}
  });