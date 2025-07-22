import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "~/api/axiosClient";
import SidebarAdmin from "~/components/SidebarAdmin";

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
    // eslint-disable-next-line
  }, [id]);

  const fetchBooking = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/admin/appointments/${id}`);
      setBooking(res.data.data);
    } catch (err) {
      alert("Lỗi tải chi tiết lịch hẹn");
      navigate(-1);
    }
    setLoading(false);
  };

  if (loading) return <div className="p-8">Đang tải...</div>;
  if (!booking) return <div className="p-8">Không tìm thấy lịch hẹn</div>;

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Chi tiết lịch hẹn</h1>
        <div className="bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thông tin khách hàng */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Khách hàng</h2>
            <div className="flex items-center gap-4 mb-2">
              {booking.user?.avatar && <img src={booking.user.avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover border" />}
              <div>
                <div className="font-bold text-base">{booking.user?.name}</div>
                <div className="text-sm text-gray-600">{booking.user?.email}</div>
                <div className="text-sm text-gray-600">{booking.user?.phone}</div>
              </div>
            </div>
            <div className="text-sm text-gray-700 mb-1"><b>Giới tính:</b> {getGenderText(booking.user?.gender)}</div>
            <div className="text-sm text-gray-700 mb-1"><b>Địa chỉ:</b> {booking.user?.address || '-'}</div>
            <div className="text-sm text-gray-700 mb-1"><b>Ngày sinh:</b> {booking.user?.dob ? new Date(booking.user.dob).toLocaleDateString() : '-'}</div>
          </div>
          {/* Thông tin thú cưng */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Thú cưng</h2>
            <div className="flex items-center gap-4 mb-2">
              {booking.pet?.image && <img src={booking.pet.image} alt="pet" className="w-16 h-16 rounded object-cover border" />}
              <div>
                <div className="font-bold text-base">{booking.pet?.name}</div>
                <div className="text-sm text-gray-600">{booking.pet?.petType} {booking.pet?.breed && `- ${booking.pet.breed}`}</div>
              </div>
            </div>
            <div className="text-sm text-gray-700 mb-1"><b>Tuổi:</b> {booking.pet?.age || '-'}</div>
            <div className="text-sm text-gray-700 mb-1"><b>Cân nặng:</b> {booking.pet?.weight ? `${booking.pet.weight} kg` : '-'}</div>
          </div>
          {/* Thông tin dịch vụ */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Dịch vụ</h2>
            <div className="flex items-center gap-4 mb-2">
              {booking.service?.image && <img src={booking.service.image} alt="service" className="w-16 h-16 rounded object-cover border" />}
              <div>
                <div className="font-bold text-base">{booking.service?.name}</div>
                <div className="text-sm text-gray-600">{getServiceTypeText(booking.service?.type)}</div>
              </div>
            </div>
            <div className="text-sm text-gray-700 mb-1"><b>Mô tả:</b> {booking.service?.description}</div>
            <div className="text-sm text-gray-700 mb-1"><b>Thời lượng:</b> {booking.service?.duration ? `${booking.service.duration} phút` : '-'}</div>
          </div>
          {/* Thông tin lịch hẹn */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Thông tin lịch hẹn</h2>
            <div className="text-sm text-gray-700 mb-1"><b>Ngày hẹn:</b> {booking.date ? new Date(booking.date).toLocaleDateString() : '-'}</div>
            <div className="text-sm text-gray-700 mb-1"><b>Khung giờ:</b> {booking.timeSlot || booking.time || '-'}</div>
            <div className="text-sm text-gray-700 mb-1"><b>Trạng thái:</b> {getStatusText(booking.status)}</div>
            <div className="text-sm text-gray-700 mb-1"><b>Đã thanh toán:</b> {booking.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
            {booking.cancelReason && (
              <div className="text-sm text-red-600 mb-1"><b>Lý do huỷ:</b> {booking.cancelReason}</div>
            )}
            {booking.note && (
              <div className="text-sm text-gray-700 mb-1"><b>Ghi chú:</b> {booking.note}</div>
            )}
            <div className="text-sm text-gray-700 mb-1"><b>Ngày tạo:</b> {booking.createdAt ? new Date(booking.createdAt).toLocaleString() : '-'}</div>
            <div className="text-sm text-gray-700 mb-1"><b>Ngày cập nhật:</b> {booking.updatedAt ? new Date(booking.updatedAt).toLocaleString() : '-'}</div>
          </div>
        </div>
        <button className="mt-6 bg-gray-500 text-white px-4 py-2 rounded" onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    </div>
  );
};

function getStatusText(status) {
  switch (status) {
    case 'pending': return 'Chờ xác nhận';
    case 'confirmed': return 'Đã xác nhận';
    case 'completed': return 'Hoàn thành';
    case 'cancelled': return 'Đã huỷ';
    case 'request_cancel': return 'Yêu cầu huỷ';
    default: return status;
  }
}
function getGenderText(gender) {
  switch (gender) {
    case 'male': return 'Nam';
    case 'female': return 'Nữ';
    default: return 'Khác';
  }
}
function getServiceTypeText(type) {
  switch (type) {
    case 'grooming': return 'Grooming';
    case 'washing': return 'Tắm rửa';
    default: return type;
  }
}

export default BookingDetail; 