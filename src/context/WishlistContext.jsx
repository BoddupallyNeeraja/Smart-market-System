import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { showToast } from '../utils/toast';

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = 'smartMarketplaceWishlist';

const readInitialWishlist = () => {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(readInitialWishlist);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const isWishlisted = (id) => items.some((item) => item.id === id);

  const toggleWishlist = (product) => {
    setItems((current) => {
      const exists = current.some((item) => item.id === product.id);
      if (exists) {
        showToast(`${product.title} removed from wishlist`, 'warning');
        return current.filter((item) => item.id !== product.id);
      }
      showToast(`${product.title} saved to wishlist`, 'info');
      return [...current, product];
    });
  };

  const clearWishlist = () => setItems([]);

  const value = useMemo(
    () => ({
      items,
      isWishlisted,
      toggleWishlist,
      clearWishlist,
    }),
    [items]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
