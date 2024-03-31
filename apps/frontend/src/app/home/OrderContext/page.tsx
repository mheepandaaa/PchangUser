'use client'
import React, { createContext, useState } from 'react';

interface Order {
  id: number;
  menu: string;
  spicy: string;
  optional_text: string;
  quantity: number;
  // Add other properties as needed
}

interface OrderContextValue {
  queueData: Order[];
  setQueueData: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const OrderContext = createContext<OrderContextValue>({
  queueData: [],
  setQueueData: () => {},
});

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queueData, setQueueData] = useState<Order[]>([]);

  return (
    <OrderContext.Provider value={{ queueData, setQueueData }}>
      {children}
    </OrderContext.Provider>
  );
};