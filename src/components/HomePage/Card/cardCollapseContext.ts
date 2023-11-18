import React, { createContext, useContext } from 'react';

type CardCollapseContextType = {
    onCollapse: () => void;
}

export const CardCollapseContext = createContext<CardCollapseContextType>({
    onCollapse: () => {}
});

export const useCardCollapse = () => useContext(CardCollapseContext);
