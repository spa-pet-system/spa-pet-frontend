import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '~/layouts/MainLayout';
import { addToCart } from '~/services/cartService';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error('Lỗi khi load chi tiết sản phẩm:', err));
    }
  }, [id]);

  if (!product) return <p className="p-6">Đang tải chi tiết sản phẩm...</p>;

  return (
    <MainLayout>
      <div className="px-6 md:px-28 py-16 bg-gray-50">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <img
              src={product.images?.[0] || '/default-product.jpg'}
              alt={product.name}
              className="w-full h-[400px] object-contain rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed text-justify">{product.description}</p>

            <div className="mb-6">
              <span className="text-3xl font-extrabold text-orange-500">
                {product.finalPrice.toLocaleString()}đ
              </span>
              {product.discount > 0 && (
                <span className="text-lg line-through text-gray-400 ml-4">
                  {product.price.toLocaleString()}đ
                </span>
              )}
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function AddToCartButton({ product }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      alert('Lỗi khi thêm vào giỏ hàng');
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="bg-orange-400 hover:bg-orange-500 text-white text-lg font-medium px-6 py-3 rounded-full transition-all duration-200 shadow-md"
      >
        🛒 Thêm vào giỏ hàng
      </button>
      {added && (
        <p className="mt-4 text-green-600 font-semibold animate-pulse">
          ✅ Đã thêm vào giỏ hàng!
        </p>
      )}
    </>
  );
}
