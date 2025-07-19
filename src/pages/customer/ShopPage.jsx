import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "~/layouts/MainLayout";
import background from "~/assets/backgr-xanhvang-expanded.png";
import { addToCart } from "~/services/cartService";

export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi khi load sản phẩm:", err));
  }, []);

  const handleAddToCartClick = async (product) => {
    try {
      await addToCart(product._id, 1);
      alert("✅ Đã thêm vào giỏ hàng!");
    } catch {
      alert("Lỗi khi thêm vào giỏ hàng");
    }
  };

  return (
    <MainLayout>
      {/* Banner */}
      <div
        className="w-full h-[600px] bg-cover bg-center flex flex-col md:flex-row items-center px-6 md:px-28 pt-[80px] pb-[40px]"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex-1 text-white md:pr-12">
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-orange-200 tracking-widest uppercase">
            All Products
          </h3>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Save <span className="text-orange-300">50%</span> Off
          </h1>
          <p className="text-md md:text-lg mb-6 text-orange-100 max-w-md leading-relaxed">
            Make your furry friend happy with our best-selling pet products!
          </p>
          <button className="bg-orange-300 hover:bg-orange-400 text-white font-semibold px-8 py-3 rounded-full shadow-md transition duration-300 ease-in-out">
            🛍️ Shop Now
          </button>
        </div>

        <div className="flex-1 hidden md:flex justify-center">
          <img
            src="/assets/pet-banner.png"
            alt="Happy Pet"
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="px-6 md:px-28 py-12 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Sản phẩm nổi bật 🐾
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">Đang tải sản phẩm...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <Link to={`/products/${product._id}`} className="block">
                  <img
                    src={product.images?.[0] || "/default-product.jpg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                </Link>

                <div className="mt-2">
                  <span className="text-orange-500 font-bold text-xl">
                    {product.finalPrice?.toLocaleString()}đ
                  </span>
                  {product.discount > 0 && (
                    <span className="text-sm line-through text-gray-400 ml-2">
                      {product.price.toLocaleString()}đ
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCartClick(product);
                  }}
                  className="mt-4 bg-orange-300 hover:bg-orange-400 text-white px-4 py-2 rounded-full w-full"
                >
                  Thêm vào giỏ
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
