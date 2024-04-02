'use client'

import React, { createContext, useState } from 'react';

interface Order {
  id: number;
  menu: string;
  spicy: string;
  optional_text: string;
  quantity: number;
  egg: string;
  container: string;
}

interface OrderContextValue {
  queueData?: Order;
  setQueueData?: React.Dispatch<React.SetStateAction<Order | undefined>>;
}

export const OrderContext = createContext<OrderContextValue>({
  queueData: undefined,
  setQueueData: () => {},
});

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queueData, setQueueData] = useState<Order>();

  return (
    <OrderContext.Provider value={{ queueData, setQueueData }}>
      {children}
    </OrderContext.Provider>
  );
};