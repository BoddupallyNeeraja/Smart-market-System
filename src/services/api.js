import axios from 'axios';
import fallbackProducts from '../data/products.json';

const REQUEST_TIMEOUT = 8000;

const endpoints = {
  primaryList: 'https://fakestoreapi.com/products',
  primaryDetail: (id) => `https://fakestoreapi.com/products/${id}`,
  fallbackList: 'https://dummyjson.com/products',
  fallbackDetail: (id) => `https://dummyjson.com/products/${id}`,
};

const normalizeProduct = (raw, source = 'primary') => {
  if (!raw) return null;

  const ratingValue =
    source === 'primary' ? raw.rating?.rate ?? 0 : raw.rating ?? 0;

  const stock = raw.stock ?? (source === 'primary' ? Math.floor(Math.random() * 40) + 1 : 0);

  return {
    id: Number(raw.id),
    title: raw.title ?? 'Untitled Product',
    description: raw.description ?? 'No description available',
    price: Number(raw.price ?? 0),
    category: raw.category ?? 'General',
    image: raw.image ?? raw.thumbnail ?? 'https://via.placeholder.com/300x300?text=No+Image',
    rating: Number(ratingValue),
    stock: Number(stock),
    createdAt: raw.createdAt ?? Date.now() - Number(raw.id || 0) * 100000,
  };
};

const requestWithTimeout = (url) => axios.get(url, { timeout: REQUEST_TIMEOUT });

export const fetchProducts = async () => {
  try {
    const { data } = await requestWithTimeout(endpoints.primaryList);
    return (Array.isArray(data) ? data : []).map((item) => normalizeProduct(item, 'primary'));
  } catch (primaryError) {
    try {
      const { data } = await requestWithTimeout(endpoints.fallbackList);
      const list = Array.isArray(data?.products) ? data.products : [];
      return list.map((item) => normalizeProduct(item, 'fallback'));
    } catch {
      return fallbackProducts.map((item) => normalizeProduct(item, 'local'));
    }
  }
};

export const fetchProductById = async (id) => {
  try {
    const { data } = await requestWithTimeout(endpoints.primaryDetail(id));
    return normalizeProduct(data, 'primary');
  } catch {
    try {
      const { data } = await requestWithTimeout(endpoints.fallbackDetail(id));
      return normalizeProduct(data, 'fallback');
    } catch {
      const localMatch = fallbackProducts.find((item) => Number(item.id) === Number(id));
      if (!localMatch) {
        throw new Error('Product not found in any source');
      }
      return normalizeProduct(localMatch, 'local');
    }
  }
};

export const getCategories = (products) =>
  ['All', ...new Set(products.map((item) => item.category))];
