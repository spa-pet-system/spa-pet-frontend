import { useEffect, useState } from "react";
import axios from "~/api/axiosClient";
import SidebarAdmin from "~/components/SidebarAdmin";
import { useNavigate } from "react-router-dom";

const CATEGORY_COLORS = {
  "Clothing": "bg-blue-100 text-blue-700",
  "Leashes and Muzzles": "bg-green-100 text-green-700",
  "Feeding Tools": "bg-yellow-100 text-yellow-700",
  "Pet Toys": "bg-pink-100 text-pink-700",
  "Beds and Mats": "bg-purple-100 text-purple-700"
};

const ManagerProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/admin/products");
      setProducts(res.data);
    } catch (err) {
      alert("Lỗi tải danh sách sản phẩm");
    }
    setLoading(false);
  };

  const handleAddProduct = () => {
    navigate("/admin/products/add");
  };

  const handleEditProduct = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleLockUnlockProduct = async (id, isLocked) => {
    if (isLocked) {
      if (window.confirm("Bạn có chắc muốn mở khóa sản phẩm này?")) {
        try {
          await axios.patch(`/admin/products/${id}/unlock`);
          fetchProducts();
        } catch (err) {
          alert("Lỗi mở khóa sản phẩm");
        }
      }
    } else {
      if (window.confirm("Bạn có chắc muốn khóa sản phẩm này?")) {
        try {
          await axios.patch(`/admin/products/${id}/lock`);
          fetchProducts();
        } catch (err) {
          alert("Lỗi khóa sản phẩm");
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <main className="flex-1 p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-3xl font-bold text-orange-600 tracking-tight">Quản lý sản phẩm</h2>
            <button
              onClick={handleAddProduct}
              className="px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white rounded-lg font-semibold shadow-md transition"
            >
              + Thêm sản phẩm
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">Danh sách sản phẩm</h3>
            {loading ? (
              <div className="text-center text-lg text-gray-500 py-8">Đang tải...</div>
            ) : (
              <table className="min-w-full text-sm border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-100 rounded-xl">
                    <th className="px-3 py-2 text-center w-12">#</th>
                    <th className="px-3 py-2 text-center w-28">Ảnh</th>
                    <th className="px-3 py-2 text-center w-40">Tên</th>
                    <th className="px-3 py-2 text-center w-64">Mô tả</th>
                    <th className="px-3 py-2 text-center w-28">Giá</th>
                    <th className="px-3 py-2 text-center w-24">Giảm giá</th>
                    <th className="px-3 py-2 text-center w-24">Tồn kho</th>
                    <th className="px-3 py-2 text-center w-40">Danh mục</th>
                    <th className="px-3 py-2 text-center w-32">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <tr
                      key={product._id}
                      className="bg-white hover:shadow-lg hover:bg-orange-50 transition rounded-xl"
                    >
                      <td className="px-3 py-2 text-center align-middle font-bold text-gray-500">{idx + 1}</td>
                      <td className="px-3 py-2 text-center align-middle">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt="product"
                            className="w-16 h-16 object-cover rounded-xl border shadow mx-auto"
                          />
                        ) : (
                          <span className="text-gray-400 italic">Không có ảnh</span>
                        )}
                      </td>
                      <td className="px-3 py-2 align-middle font-semibold text-gray-800 max-w-[160px] truncate text-center">{product.name}</td>
                      <td className="px-3 py-2 align-middle max-w-[220px] text-gray-600 text-center">
                        <div className="line-clamp-2 overflow-hidden text-ellipsis" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                          {product.description}
                        </div>
                      </td>
                      <td className="px-3 py-2 align-middle font-bold text-orange-600 text-right whitespace-nowrap">{product.price.toLocaleString()} đ</td>
                      <td className="px-3 py-2 align-middle text-center">
                        <span className="inline-block px-2 py-1 rounded bg-orange-100 text-orange-700 font-semibold text-xs">
                          {product.discount || 0}%
                        </span>
                      </td>
                      <td className="px-3 py-2 align-middle text-center">
                        <span className={`inline-block px-2 py-1 rounded font-bold text-xs ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-3 py-2 align-middle text-center">
                        <span className={`inline-block px-2 py-1 rounded-xl font-semibold text-xs ${CATEGORY_COLORS[product.category] || 'bg-gray-100 text-gray-700'}`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="px-3 py-2 align-middle flex gap-2 justify-center items-center">
                        <button
                          className="px-3 py-1 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white text-xs font-bold shadow transition"
                          onClick={() => handleEditProduct(product._id)}
                          title="Sửa sản phẩm"
                        >
                          Sửa
                        </button>
                        {product.isVisible ? (
                          <button
                            className="px-3 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold shadow transition"
                            onClick={() => handleLockUnlockProduct(product._id, false)}
                            title="Khóa sản phẩm"
                          >
                            Lock
                          </button>
                        ) : (
                          <button
                            className="px-3 py-1 rounded-full bg-green-500 hover:bg-green-600 text-white text-xs font-bold shadow transition"
                            onClick={() => handleLockUnlockProduct(product._id, true)}
                            title="Mở khóa sản phẩm"
                          >
                            Unlock
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerProduct;
