import { useEffect, useState } from 'react';
import MainLayout from '~/layouts/MainLayout';
import { getCart, updateCartItem, removeCartItem } from '~/services/cartService';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

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
          <div className="mt-10 flex flex-col items-end gap-4">
            <div className="text-xl font-semibold">
              Tổng tiền:{' '}
              <span className="text-orange-600 font-bold">{total.toLocaleString()}đ</span>
            </div>
            <div className="flex gap-4 flex-wrap">
              <button
                className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-100"
                onClick={() => navigate('/customer/shop')}
              >
                ← Quay lại Shop
              </button>
              <button className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                Thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
