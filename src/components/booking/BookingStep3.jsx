import { format } from "date-fns";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "~/contexts/AuthContext";
import { createNewAppointment } from '~/services/appointmentService'
import { useNavigate } from "react-router-dom";

export default function BookingStep3({
  selectedService,
  selectedDate,
  selectedTime,
  formData,
}) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  const createAppointment = async (appointment) => {
    try {
      const res = await createNewAppointment(appointment)
      toast.success('Added')
      navigate('/')

      return res
    } catch (error) {
      toast.error(error)
    }

  }
  const handleSubmit = async () => {
    if (loading) return; // Tránh gọi nhiều lần
    setLoading(true);

    const dataSubmit = {
      user: user._id,
      pet: formData.pet._id,
      service: selectedService,
      date: selectedDate,
      timeSlot: selectedTime,
      note: formData.note
    };

    try {
      const data = await createAppointment(dataSubmit);
      console.log("data: ", data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Dù thành công hay lỗi vẫn mở lại nút
    }
  };


  return (
    <div className="space-y-6 px-4">
      <h2 className="text-2xl font-bold text-orange-600">🧾 Xác nhận thông tin</h2>

      {/* Grid 3 cột */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dịch vụ */}
        <div className="bg-white shadow rounded-2xl p-5 border">
          <h3 className="text-lg font-semibold text-orange-500 mb-3 flex items-center gap-2">
            📋 Dịch vụ
          </h3>
          <div className="space-y-1 text-gray-700 text-sm">
            <p><strong>Dịch vụ:</strong> {selectedService || "---"}</p>
            <p><strong>Ngày:</strong> {selectedDate ? format(new Date(selectedDate), "dd/MM/yyyy") : "---"}</p>
            <p><strong>Giờ:</strong> {selectedTime || "---"}</p>
          </div>
        </div>

        {/* Người đặt */}
        <div className="bg-white shadow rounded-2xl p-5 border">
          <h3 className="text-lg font-semibold text-orange-500 mb-3 flex items-center gap-2">
            🙋 Người đặt
          </h3>
          <div className="space-y-1 text-gray-700 text-sm">
            <p><strong>Tên:</strong> {user?.fullName || user?.name || "---"}</p>
            <p><strong>Email:</strong> {user?.email || "---"}</p>
            <p><strong>Số điện thoại:</strong> {user?.phone || "(Chưa có)"}</p>
          </div>
        </div>

        {/* Thú cưng */}
        <div className="bg-white shadow rounded-2xl p-5 border">
          <h3 className="text-lg font-semibold text-orange-500 mb-3 flex items-center gap-2">
            🐾 Thú cưng
          </h3>
          <div className="space-y-1 text-gray-700 text-sm">
            <p><strong>Tên:</strong> {formData?.pet?.name || "---"}</p>
            <p><strong>Loại:</strong> {
              formData?.pet?.petType === "dog"
                ? "Chó"
                : formData?.pet?.petType === "cat"
                  ? "Mèo"
                  : "---"
            }</p>
            <p><strong>Giống:</strong> {formData?.pet?.breed || "---"}</p>
            <p><strong>Tuổi:</strong> {formData?.pet?.age ? `${formData.pet.age} năm` : "---"}</p>
            <p><strong>Cân nặng:</strong> {formData?.pet?.weight ? `${formData.pet.weight} kg` : "---"}</p>
          </div>
        </div>
      </div>

      {/* Ghi chú */}
      <div className="bg-white shadow rounded-2xl p-5 border mt-4">
        <h3 className="text-lg font-semibold text-orange-500 mb-3 flex items-center gap-2">
          📝 Ghi chú
        </h3>
        <p className="text-gray-700 text-sm">{formData?.note || "(Không có ghi chú)"}</p>
      </div>

      {/* Nút xác nhận */}
      <div className="text-center mt-6">
        <button
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-bold text-lg shadow transition duration-200
    ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          onClick={handleSubmit}
        >
          {loading ? "⏳ Đang xử lý..." : "✅ Xác nhận đặt lịch"}
        </button>

      </div>
    </div>
  );
}
