import { useEffect, useState } from "react";
import axios from "~/api/axiosClient";
import SidebarAdmin from "~/components/SidebarAdmin";
import { useNavigate } from "react-router-dom";

const STATUS_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: "pending", label: "Chờ xử lý" },
  { value: "paid", label: "Đã thanh toán" },
  { value: "shipped", label: "Đang giao" },
  { value: "delivered", label: "Đã giao" },
  { value: "cancelled", label: "Đã hủy" },
];

const ManagerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, [page, status, search]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = { page, status, search };
      const res = await axios.get("/admin/orders", { params });
      setOrders(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      alert("Lỗi tải danh sách đơn hàng");
    }
    setLoading(false);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    if (!window.confirm("Xác nhận cập nhật trạng thái đơn hàng?")) return;
    try {
      await axios.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      alert("Lỗi cập nhật trạng thái đơn hàng");
    }
  };

  function getStatusLabel(status) {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'paid': return 'Đã thanh toán';
      case 'shipped': return 'Đang giao';
      case 'delivered': return 'Đã giao';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  }

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>
        <form className="flex gap-4 mb-4" onSubmit={handleSearch}>
          <select value={status} onChange={handleStatusChange} className="border rounded px-2 py-1">
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Tìm kiếm mã đơn, tổng tiền..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <button type="submit" className="bg-orange-500 text-white px-4 py-1 rounded">Tìm kiếm</button>
        </form>
        {loading ? (
          <div>Đang tải...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">Mã đơn</th>
                  <th className="border px-2 py-1">Khách hàng</th>
                  <th className="border px-2 py-1">Tổng tiền</th>
                  <th className="border px-2 py-1">Trạng thái</th>
                  <th className="border px-2 py-1">Ngày tạo</th>
                  <th className="border px-2 py-1">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-4">Không có đơn hàng</td></tr>
                ) : orders.map(order => (
                  <tr key={order._id}>
                    <td className="border px-2 py-1">{order.orderCode || order._id}</td>
                    <td className="border px-2 py-1">{order.user?.name || ""}</td>
                    <td className="border px-2 py-1">{order.total?.toLocaleString()} đ</td>
                    <td className="border px-2 py-1">{getStatusLabel(order.status)}</td>
                    <td className="border px-2 py-1">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="border px-2 py-1 flex gap-2">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => navigate(`/admin/orders/detail/${order._id}`)}
                      >Chi tiết</button>
                  
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4 gap-2">
              <button
                className="px-3 py-1 border rounded"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >Trước</button>
              <span className="px-2">{page} / {totalPages}</span>
              <button
                className="px-3 py-1 border rounded"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >Sau</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerOrder; 