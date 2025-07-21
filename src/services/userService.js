import axios from '../api/axiosClient';

export const getProfile = async () => {
  const res = await axios.get('/auth/me');
  return res.data;
};
