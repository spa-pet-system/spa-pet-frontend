import { format } from "date-fns";

export default function BookingStep2({
    formData,
    setFormData,
    selectedService,
    selectedDate,
    selectedTime,
  }) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-orange-600">Thông tin đặt lịch</h2>
  
        <div>
          <label className="block">Tên thú cưng</label>
          <input
            type="text"
            value={formData.petName || ""}
            onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
  
        <div>
          <label className="block">Ghi chú (nếu có)</label>
          <textarea
            value={formData.note || ""}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="border p-2 w-full"
          ></textarea>
        </div>
  
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Dịch vụ:</strong> {selectedService}</p>
          <p><strong>Ngày:</strong> {selectedDate ? format(new Date(selectedDate), "dd/MM/yyyy") : "---"}</p>
          <p><strong>Giờ:</strong> {selectedTime}</p>
        </div>
      </div>
    );
  }
  