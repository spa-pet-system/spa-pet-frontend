import { useEffect, useState } from "react";
import axios from "~/api/axiosClient";
import SidebarAdmin from "~/components/SidebarAdmin";
import { useNavigate } from "react-router-dom";

const InProcessAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, [page, search]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const params = { page, search };
      // Lấy danh sách đang thực hiện
      const res = await axios.get("/admin/appointments/in_progress", { params });
      setAppointments(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      alert("Lỗi tải danh sách lịch hẹn");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleUpdateStatus = async (appointmentId, newStatus) => {
    if (!window.confirm("Xác nhận cập nhật trạng thái lịch hẹn?")) return;
    try {
      await axios.put(`/admin/appointments/${appointmentId}/status`, { status: newStatus });
      fetchAppointments();
    } catch (err) {
      alert("Lỗi cập nhật trạng thái lịch hẹn");
    }
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Quản lý lịch hẹn – Đang thực hiện</h1>
        <form className="flex gap-4 mb-4" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Tìm kiếm tên khách, dịch vụ..."
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
                  <th className="border px-2 py-1">Khách hàng</th>
                  <th className="border px-2 py-1">SĐT</th>
                  <th className="border px-2 py-1">Email</th>
                  <th className="border px-2 py-1">Thú cưng</th>
                  <th className="border px-2 py-1">Loại</th>
                  <th className="border px-2 py-1">Dịch vụ</th>
                  <th className="border px-2 py-1">Thời gian</th>
                  <th className="border px-2 py-1">Trạng thái</th>
                  <th className="border px-2 py-1">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr><td colSpan={9} className="text-center py-4">Không có lịch hẹn</td></tr>
                ) : appointments.map(app => (
                  <tr key={app._id}>
                    <td className="border px-2 py-1">{app.user?.name}</td>
                    <td className="border px-2 py-1">{app.user?.phone}</td>
                    <td className="border px-2 py-1">{app.user?.email}</td>
                    <td className="border px-2 py-1">{app.pet?.name}</td>
                    <td className="border px-2 py-1">{app.pet?.petType}</td>
                    <td className="border px-2 py-1">{app.service?.name}</td>
                    <td className="border px-2 py-1">
                      {app.date ? new Date(app.date).toLocaleDateString() : ""} {app.timeSlot || app.time}
                    </td>
                    <td className="border px-2 py-1">{getStatusText(app.status)}</td>
                    <td className="border px-2 py-1 flex gap-1 flex-wrap">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => navigate(`/admin/appointments/detail/${app._id}`)}
                      >Chi tiết</button>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleUpdateStatus(app._id, 'waiting_payment')}
                      >Hoàn tất dịch vụ</button>
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

// Hàm chuyển status → text
function getStatusText(status) {
  switch (status) {
    case 'pending':         return 'Chờ xác nhận';
    case 'confirmed':       return 'Đã xác nhận';
    case 'in_process':      return 'Đang thực hiện';
    case 'awaiting_payment':return 'Chờ thanh toán';
    case 'paid':            return 'Đã thanh toán';
    case 'completed':       return 'Hoàn thành';
    case 'cancelled':       return 'Đã huỷ';
    case 'request_cancel':  return 'Yêu cầu huỷ';
    default:                return status;
  }
}

export default InProcessAppointments;
