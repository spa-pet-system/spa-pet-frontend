import { useEffect, useState } from 'react';
import MainLayout from '~/layouts/MainLayout';
import { getCart, updateCartItem, removeCartItem } from '~/services/cartService';
import { createPaymentLink, createOrder, confirmPayment } from '~/services/paymentService';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const payment = urlParams.get('payment');
    const orderCode = urlParams.get('orderCode');
    
    if (payment === 'success' && orderCode) {
      // Check payment status and handle success
      handlePaymentSuccess(orderCode);
    } else if (payment === 'cancelled') {
      toast.error('Thanh toán đã bị hủy');
      // Clear URL parameters
      navigate('/cart', { replace: true });
    }
  }, [location.search, navigate]);

  const handlePaymentSuccess = async (orderCode) => {
    try {
      // Confirm payment with backend
      const result = await confirmPayment(orderCode);
      
      if (result.success) {
        toast.success('Thanh toán thành công!');
        // Clear cart
        await fetchCart();
        // Navigate to orders page
        navigate('/customer/orders');
      } else {
        toast.error(result.message || 'Có lỗi xảy ra khi xác nhận thanh toán');
      }
    } catch (error) {
      console.error('Error handling payment success:', error);
      toast.error('Có lỗi xảy ra khi xử lý thanh toán');
    }
  };

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.error('Lỗi khi load giỏ hàng:', err);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateCartItem(productId, newQuantity);
    fetchCart();
  };

  const handleRemove = async (productId) => {
    await removeCartItem(productId);
    fetchCart();
  };

  const total = cart?.items?.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + item.product.finalPrice * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) {
      toast.error('Giỏ hàng trống!');
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === 'cod') {
        // Handle COD payment
        const orderData = { paymentMethod: 'cod' };
        const result = await createOrder(orderData);
        
        if (result.success) {
          toast.success('Đặt hàng thành công!');
          navigate('/customer/orders'); // Navigate to orders page
        }
      } else if (paymentMethod === 'qr') {
        // Handle QR payment
        const paymentData = {
          items: cart.items.map(item => ({
            productId: item.product._id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.finalPrice
          })),
          total: total
        };
        
        const result = await createPaymentLink(paymentData);
        
        if (result.success && result.data.checkoutUrl) {
          // Redirect to PayOS checkout page
          window.location.href = result.data.checkoutUrl;
        } else {
          toast.error('Không thể tạo liên kết thanh toán');
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi thanh toán');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cart) return <p className="p-6">Đang tải giỏ hàng...</p>;

  return (
    <MainLayout>
      <div className="px-6 md:px-28 py-12 bg-white min-h-screen">
        <h1 className="text-3xl font-bold mb-8">🛒 Giỏ hàng của bạn</h1>

        <div className="flex flex-col gap-8">
          {cart.items.length === 0 ? (
            <p>Giỏ hàng của bạn đang trống.</p>
          ) : (
            cart.items.map((item) =>
              item.product ? (
                <div
                  key={item.product._id}
                  className="flex flex-col md:flex-row items-center gap-6 border-b pb-6"
                >
                  <img
                    src={item.product.images?.[0] || '/default-product.jpg'}
                    alt={item.product.name}
                    className="w-28 h-28 object-cover rounded shadow"
                  />
                  <div className="flex-1 w-full">
                    <h2 className="text-xl font-semibold mb-1">{item.product.name}</h2>
                    <p className="text-gray-500 mb-2">
                      Giá: {item.product.finalPrice.toLocaleString()}đ
                    </p>

                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(item.product._id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-10 text-center border border-gray-300 rounded font-semibold"
                      />
                      <button
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(item.product._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        className="text-red-500 hover:underline text-sm ml-4"
                        onClick={() => handleRemove(item.product._id)}
                      >
                        ❌ Xoá
                      </button>
                    </div>
                  </div>
                  <div className="text-orange-600 text-xl font-bold whitespace-nowrap">
                    {(item.product.finalPrice * item.quantity).toLocaleString()}đ
                  </div>
                </div>
              ) : null
            )
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="mt-10 flex flex-col items-end gap-6">
            <div className="text-xl font-semibold">
              Tổng tiền:{' '}
              <span className="text-orange-600 font-bold">{total.toLocaleString()}đ</span>
            </div>
            
            {/* Payment Method Selection */}
            <div className="w-full max-w-md">
              <h3 className="text-lg font-semibold mb-3">Chọn phương thức thanh toán:</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-orange-500"
                  />
                  <span>💵 Thanh toán khi nhận hàng (COD)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="qr"
                    checked={paymentMethod === 'qr'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-orange-500"
                  />
                  <span>📱 Thanh toán QR Code</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <button
                className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-100"
                onClick={() => navigate('/shop')}
              >
                ← Quay lại Shop
              </button>
              <button 
                className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? 'Đang xử lý...' : 'Thanh toán'}
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
