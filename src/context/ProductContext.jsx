import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchProducts as fetchProductsApi } from '../services/api';
import { showToast } from '../utils/toast';

const CUSTOM_PRODUCTS_KEY = 'smartMarketplaceCustomProducts';
const ProductContext = createContext(null);

const readCustomProducts = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [customProducts, setCustomProducts] = useState(readCustomProducts);

  useEffect(() => {
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(customProducts));
  }, [customProducts]);

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const apiProducts = await fetchProductsApi();
      setProducts([...customProducts, ...apiProducts]);
    } catch {
      setError('Unable to load products right now.');
      setProducts([...customProducts]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [customProducts]);

  const addProduct = (payload) => {
    const newProduct = {
      id: Date.now(),
      title: payload.title,
      description: payload.description,
      price: Number(payload.price),
      category: payload.category,
      image: payload.image,
      rating: Number(payload.rating || 4),
      stock: Number(payload.stock || 1),
      createdAt: Date.now(),
      isCustom: true,
    };

    setCustomProducts((prev) => [newProduct, ...prev]);
    showToast('Product added successfully', 'success');
  };

  const updateProduct = (id, updates) => {
    setCustomProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
              price: Number(updates.price),
              stock: Number(updates.stock),
            }
          : item
      )
    );
    showToast('Product updated', 'info');
  };

  const deleteProduct = (id) => {
    setCustomProducts((prev) => prev.filter((item) => item.id !== id));
    showToast('Product deleted', 'warning');
  };

  const getProductById = (id) => products.find((item) => Number(item.id) === Number(id));

  const value = useMemo(
    () => ({
      products,
      customProducts,
      isLoading,
      error,
      loadProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
    }),
    [products, customProducts, isLoading, error]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
