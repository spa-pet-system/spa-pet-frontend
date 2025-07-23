import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "~/layouts/MainLayout";
import { addToCart } from "~/services/cartService";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("createdAt_desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [addedProductId, setAddedProductId] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams({
      page,
      limit: 8,
      sort,
    });
    if (searchTerm) query.append("name", searchTerm);

    fetch(`http://localhost:3000/api/products?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error("Lỗi khi load sản phẩm:", err));
  }, [page, sort, searchTerm]);

  const handleAddToCartClick = async (product) => {
    try {
      await addToCart(product._id, 1);
      setAddedProductId(product._id); // Đánh dấu sản phẩm đã được thêm
      setTimeout(() => setAddedProductId(null), 2000); // Xoá sau 2s
    } catch {
      alert("Lỗi khi thêm vào giỏ hàng");
    }
  };

  return (
    <MainLayout>
      <div className="bg-orange-50 py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          🛍️ Sản phẩm mới nhất
        </h1>
        <p className="text-gray-600">
          Hãy chọn món đồ yêu thích cho thú cưng của bạn!
        </p>
      </div>

      <div className="px-6 md:px-28 py-10 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Tất cả sản phẩm ({products.length})
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-orange-300 focus:border-orange-400"
            />

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-gray-600 text-sm">
                Sắp xếp:
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-orange-300 focus:border-orange-400"
              >
                <option value="name_asc">Tên A-Z</option>
                <option value="name_desc">Tên Z-A</option>
                <option value="price_asc">Giá tăng dần</option>
                <option value="price_desc">Giá giảm dần</option>
              </select>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500">Đang tải sản phẩm...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <Link to={`/products/${product._id}`} className="block group">
                    <img
                      src={product.images?.[0] || "/default-product.jpg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md mb-3 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-500 transition">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
                      {product.description}
                    </p>
                  </Link>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-orange-500 font-bold text-lg">
                      {product.finalPrice?.toLocaleString()}đ
                    </span>
                    {product.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        {product.price.toLocaleString()}đ
                      </span>
                    )}
                  </div>
                  {/* Số lượng tồn kho */}
                  <p className="text-sm text-gray-600 mt-1">
                    {product.stock > 0
                      ? `🗃️ Còn lại ${product.stock} sản phẩm trong kho`
                      : "❌ Hết hàng"}
                  </p>
                      {addedProductId === product._id && (
                    <p className="mt-4 text-green-600 font-semibold animate-pulse">
                      ✅ Đã thêm vào giỏ hàng!
                    </p>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCartClick(product);
                    }}
                    disabled={product.stock <= 0}
                    className={`mt-4 ${
                      product.stock <= 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-orange-400 hover:bg-orange-500"
                    } text-white font-medium px-4 py-2 rounded-full w-full transition`}
                  >
                    {product.stock <= 0 ? "Hết hàng ❌" : "Thêm vào giỏ 🛒"}
                  </button>
                  
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12 space-x-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 border rounded ${
                    page === p ? "bg-orange-400 text-white" : ""
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                →
              </button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
