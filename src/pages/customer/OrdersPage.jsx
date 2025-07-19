import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '~/layouts/MainLayout';
import { getUserOrders } from '~/services/paymentService';
import { toast } from 'react-toastify';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchOrders();
    
    // Handle payment redirect results
    const payment = searchParams.get('payment');
    const orderCode = searchParams.get('orderCode');
    
    if (payment === 'success') {
      toast.success(`Thanh toán thành công! Mã đơn hàng: ${orderCode}`);
    } else if (payment === 'cancelled') {
      toast.error('Thanh toán đã bị hủy');
    }
  }, [searchParams]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const result = await getUserOrders();
      if (result.success) {
        setOrders(result.data);
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
      toast.error('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'paid': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'delivered': return 'text-green-700 bg-green-200';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'paid': return 'Đã thanh toán';
      case 'shipped': return 'Đang giao';
      case 'delivered': return 'Đã giao';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'cod': return '💵 COD';
      case 'qr': return '📱 QR Code';
      default: return method;
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="px-6 md:px-28 py-12 bg-white min-h-screen">
          <p className="text-center">Đang tải danh sách đơn hàng...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="px-6 md:px-28 py-12 bg-white min-h-screen">
        <h1 className="text-3xl font-bold mb-8">📦 Đơn hàng của bạn</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Bạn chưa có đơn hàng nào</p>
            <button 
              onClick={() => window.location.href = '/shop'}
              className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Mua sắm ngay
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border rounded-lg p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      Đơn hàng #{order.orderCode || order._id.slice(-8)}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    <span className="text-sm text-gray-600">
                      {getPaymentMethodText(order.paymentMethod)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.product?.images?.[0] || '/default-product.jpg'}
                        alt={item.product?.name || 'Sản phẩm'}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product?.name || 'Sản phẩm đã bị xóa'}</h4>
                        <p className="text-gray-500 text-sm">
                          Số lượng: {item.quantity} × {item.product?.price?.toLocaleString() || 0}đ
                        </p>
                      </div>
                      <div className="text-orange-600 font-semibold">
                        {((item.product?.price || 0) * item.quantity).toLocaleString()}đ
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-gray-600">Tổng tiền:</span>
                  <span className="text-xl font-bold text-orange-600">
                    {order.total.toLocaleString()}đ
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}