import React, { createContext, useState } from 'react';

// ✅ Create a Context for Dashboard Stats
export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [orders, setOrders] = useState(0);
  const [payments, setPayments] = useState(0);
  const [products, setProducts] = useState(0);

  // ✅ Functions to update the stats
  const addOrder = () => setOrders((prev) => prev + 1);
  const addPayment = (amount) => setPayments((prev) => prev + amount);
  const addProduct = () => setProducts((prev) => prev + 1);

  return (
    <DashboardContext.Provider
      value={{ orders, payments, products, addOrder, addPayment, addProduct }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
