import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "~/layouts/MainLayout";
import { addToCart } from "~/services/cartService";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("Lỗi khi load chi tiết sản phẩm:", err));
    }
  }, [id]);

  if (!product) return <p className="p-6">Đang tải chi tiết sản phẩm...</p>;

  return (
    <MainLayout>
      <div className="px-6 md:px-28 py-12 bg-gray-100 min-h-screen">
        {/* Nút quay lại */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-orange-500 hover:text-orange-600 font-semibold text-lg flex items-center"
        >
          ← Quay lại
        </button>

        <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-xl">
          {/* Hình ảnh */}
          <div className="relative group">
            <img
              src={product.images?.[0] || "/default-product.jpg"}
              alt={product.name}
              className="w-full h-[400px] object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              {product.name}
            </h2>

            {product.category && (
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                {product.category}
              </p>
            )}

            <p className="text-gray-700 leading-relaxed text-justify">
              {product.description}
            </p>

            {/* Giá & khuyến mãi */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-orange-500">
                {product.finalPrice.toLocaleString()}₫
              </span>
              {product.discount > 0 && (
                <span className="text-lg line-through text-gray-400">
                  {product.price.toLocaleString()}₫
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-green-600 font-medium">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Số lượng tồn kho */}
            <p className="text-sm text-gray-600 mt-1">
              {product.stock > 0
                ? `🗃️ Còn lại ${product.stock} sản phẩm trong kho`
                : "❌ Hết hàng"}
            </p>

            {/* Nút thêm vào giỏ */}
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
      alert("Lỗi khi thêm vào giỏ hàng");
    }
  };

  return (
    <div className="pt-4">
      <button
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
        className={`text-white text-lg font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-lg w-full ${
          product.stock <= 0
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {product.stock <= 0 ? "❌ Hết hàng" : "🛒 Thêm vào giỏ hàng"}
      </button>

      {added && (
        <p className="mt-4 text-green-600 font-semibold animate-pulse">
          ✅ Đã thêm vào giỏ hàng!
        </p>
      )}
    </div>
  );
}
