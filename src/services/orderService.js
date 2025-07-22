import axiosClient from '../api/axiosClient';

// Lấy tổng số lượng đơn hàng (admin)
export const getOrderCount = async () => {
  const res = await axiosClient.get('/orders/admin/count');
  return res.data.totalOrders;
};

export const getTotalRevenue = async () => {
  const res = await axiosClient.get('/orders/admin/revenue');
  return res.data.totalRevenue;
}; 