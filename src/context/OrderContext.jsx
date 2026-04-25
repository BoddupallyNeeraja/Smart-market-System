import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { showToast } from '../utils/toast';

const ORDERS_STORAGE_KEY = 'smartMarketplaceOrders';
const OrderContext = createContext(null);

const readOrders = () => {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(readOrders);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const placeOrder = ({ items, total, customerEmail }) => {
    const order = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customerEmail,
      items,
      total,
      itemCount: items.reduce((acc, item) => acc + item.quantity, 0),
      status: 'Placed',
    };
    setOrders((prev) => [order, ...prev]);
    showToast('Delivery placed successfully', 'success');
    return order;
  };

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((acc, order) => acc + Number(order.total || 0), 0);
    const totalItems = orders.reduce((acc, order) => acc + Number(order.itemCount || 0), 0);
    return {
      ordersCount: orders.length,
      totalRevenue,
      totalItems,
    };
  }, [orders]);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, stats }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
};
