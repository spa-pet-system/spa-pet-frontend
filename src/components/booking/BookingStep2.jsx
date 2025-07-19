import { useContext, useState } from "react";
import { format } from "date-fns";
import { AuthContext } from "~/contexts/AuthContext";
import PetModalForBooking from "./PetModelForBooking";
import AddPetFormForBooking from "./AddPetForBooking";

export default function BookingStep2({
  formData,
  setFormData,
  selectedService,
  selectedDate,
  selectedTime,
}) {
  const { user } = useContext(AuthContext);
  const [showPetModal, setShowPetModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSelectPet = (pet) => {
    setFormData({ ...formData, pet });
    setShowPetModal(false);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-orange-600">Thông tin đặt lịch</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BÊN TRÁI: NGƯỜI DÙNG */}
        <div className="space-y-3 bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-700">👤 Thông tin người đặt</h3>
          <p><strong>Họ tên:</strong> {user?.name || "---"}</p>
          <p><strong>Điện thoại:</strong> {user?.phone || "---"}</p>
          <p><strong>Email:</strong> {user?.email || "---"}</p>
        </div>

        {/* BÊN PHẢI: THÚ CƯNG */}
        <div className="space-y-4 bg-gray-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-700">🐾 Thú cưng</h3>

          {!formData.pet ? (
            <div className="space-y-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
                onClick={() => {
                  setShowPetModal(true);
                  setShowAddForm(false);
                }}
              >
                📂 Chọn thú cưng có sẵn
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full"
                onClick={() => {
                  setShowAddForm(true);
                  setShowPetModal(false);
                }}
              >
                ➕ Thêm mới thú cưng
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <p><strong>Tên:</strong> {formData.pet.name}</p>
              <p><strong>Loại:</strong> {formData.pet.petType === "dog" ? "Chó" : "Mèo"}</p>
              <p><strong>Giống:</strong> {formData.pet.breed}</p>
              <p><strong>Tuổi:</strong> {formData.pet.age} năm</p>
              <p><strong>Cân nặng:</strong> {formData.pet.weight} kg</p>
              <button
                className="text-sm text-blue-600 hover:underline mt-2"
                onClick={() => setFormData({ ...formData, pet: null })}
              >
                🔁 Chọn lại
              </button>
            </div>
          )}
        </div>
      </div>

      {/* GHI CHÚ */}
      <div>
        <label className="block font-medium">Ghi chú (nếu có)</label>
        <textarea
          value={formData.note || ""}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          className="border p-2 w-full rounded"
          placeholder="Nhập thêm yêu cầu nếu có..."
        />
      </div>

      {/* TỔNG QUAN */}
      <div className="bg-yellow-50 p-4 rounded border border-yellow-300">
        <p><strong>Dịch vụ:</strong> {selectedService}</p>
        <p><strong>Ngày:</strong> {selectedDate ? format(new Date(selectedDate), "dd/MM/yyyy") : "---"}</p>
        <p><strong>Giờ:</strong> {selectedTime || "---"}</p>
      </div>

      {/* Modal chọn thú cưng */}
      {showPetModal && (
        <PetModalForBooking
          onClose={() => setShowPetModal(false)}
          onSelect={handleSelectPet}
        />
      )}

      {/* Form thêm mới */}
      {showAddForm && (
        <AddPetFormForBooking
          onClose={() => setShowAddForm(false)}
          onAdded={handleSelectPet}
        />
      )}
    </div>
  );
}
