import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "~/api/axiosClient";
import SidebarAdmin from "~/components/SidebarAdmin";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/admin/orders/${id}`);
      setOrder(res.data.data);
    } catch (err) {
      alert("Lỗi tải chi tiết đơn hàng");
      navigate(-1);
    }
    setLoading(false);
  };

  if (loading) return <div className="p-8">Đang tải...</div>;
  if (!order) return <div className="p-8">Không tìm thấy đơn hàng</div>;

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Chi tiết đơn hàng</h1>
        <div className="bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Thông tin đơn hàng</h2>
            <div><b>Mã đơn:</b> {order.orderCode || order._id}</div>
            <div><b>Trạng thái:</b> {getStatusLabel(order.status)}</div>
            <div><b>Ngày tạo:</b> {new Date(order.createdAt).toLocaleString()}</div>
            <div><b>Ghi chú:</b> {order.note || '-'}</div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Khách hàng</h2>
            <div><b>Tên:</b> {order.user?.name}</div>
            <div><b>Email:</b> {order.user?.email}</div>
            <div><b>SĐT:</b> {order.user?.phone}</div>
            <div><b>Địa chỉ:</b> {order.address || '-'}</div>
          </div>
        </div>

        <div className="bg-white rounded shadow p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Sản phẩm</h2>
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Ảnh</th>
                <th className="border px-2 py-1">Tên sản phẩm</th>
                <th className="border px-2 py-1">Số lượng</th>
                <th className="border px-2 py-1">Giá</th>
                <th className="border px-2 py-1">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">
                    {item.product?.images?.[0]
                      ? <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover rounded" />
                      : <span className="text-gray-400 italic">Không có ảnh</span>}
                  </td>
                  <td className="border px-2 py-1">
                    {item.product?.name || <span className="text-gray-400 italic">Sản phẩm đã xóa</span>}
                  </td>
                  <td className="border px-2 py-1">{item.quantity}</td>
                  <td className="border px-2 py-1">{item.product.price?.toLocaleString()} đ</td>
                  <td className="border px-2 py-1">{(item.product.price * item.quantity).toLocaleString()} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-4 text-lg font-bold">
            Tổng tiền: <span className="text-orange-600">{order.total?.toLocaleString()} đ</span>
          </div>
        </div>
        <button className="mt-6 bg-gray-500 text-white px-4 py-2 rounded" onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    </div>
  );
};

function getStatusLabel(status) {
  switch (status) {
    case "pending": return "Chờ xử lý";
    case "paid": return "Đã thanh toán";
    case "shipped": return "Đang giao";
    case "delivered": return "Đã giao";
    case "cancelled": return "Đã hủy";
    default: return status;
  }
}

export default OrderDetail;
