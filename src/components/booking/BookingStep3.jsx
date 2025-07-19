export default function BookingStep3({
    selectedService,
    selectedDate,
    selectedTime,
    formData,
  }) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-orange-600">Xác nhận thông tin</h2>
  
        <div className="bg-gray-100 p-4 rounded space-y-2">
          <p><strong>Dịch vụ:</strong> {selectedService}</p>
          <p><strong>Ngày:</strong> {selectedDate}</p>
          <p><strong>Giờ:</strong> {selectedTime}</p>
          <p><strong>Tên thú cưng:</strong> {formData.petName}</p>
          <p><strong>Ghi chú:</strong> {formData.note || "(Không có)"}</p>
        </div>
  
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          ✅ Xác nhận đặt lịch
        </button>
      </div>
    );
  }
  