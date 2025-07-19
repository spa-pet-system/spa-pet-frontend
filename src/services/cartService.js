import axios from '~/api/axiosClient';

export const getCart = async () => {
  const res = await axios.get('/cart');
  return res.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await axios.post('/cart', { productId, quantity });
  return res.data;
};

export const updateCartItem = async (productId, quantity) => {
  const res = await axios.put(`/cart/${productId}`, { quantity });
  return res.data;
};

export const removeCartItem = async (productId) => {
  const res = await axios.delete(`/cart/${productId}`);
  return res.data;
};
