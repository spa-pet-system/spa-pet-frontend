import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPetsByCustomer } from "~/services/petService";
import AddPetForBooking from "./AddPetForBooking";

export default function PetModalForBooking({ onClose, onSelect }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    try {
      const data = await getPetsByCustomer();
      setPets(data || []);
    } catch (error) {
      toast.error("Không thể tải danh sách thú cưng");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleSelectPet = (pet) => {
    onSelect(pet);     // Gửi dữ liệu pet lên BookingStep2
    onClose();         // Đóng modal
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white w-[90%] max-w-3xl p-6 rounded-lg shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-red-500"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold text-orange-600 mb-4">🐾 Chọn thú cưng</h2>

          {loading ? (
            <p>Đang tải...</p>
          ) : pets.length === 0 ? (
            <p>Chưa có thú cưng nào.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
              {pets.map((pet) => (
                <div
                  key={pet._id}
                  onClick={() => handleSelectPet(pet)}
                  className="border p-4 rounded shadow hover:bg-orange-100 cursor-pointer"
                >
                  <p><strong>Tên:</strong> {pet.name}</p>
                  <p><strong>Loại:</strong> {pet.petType === "dog" ? "Chó" : "Mèo"}</p>
                  <p><strong>Giống:</strong> {pet.breed}</p>
                  <p><strong>Tuổi:</strong> {pet.age} năm</p>
                  <p><strong>Cân nặng:</strong> {pet.weight} kg</p>
                </div>
              ))}
            </div>
          )}

          
        </div>
      </div>

    
    </>
  );
}
