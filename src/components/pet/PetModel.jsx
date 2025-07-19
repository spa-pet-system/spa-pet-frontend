import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPetsByCustomer } from "~/services/petService";
import AddPetForm from "./AddPetForm";

export default function PetModal({ onClose, selectable = false, onSelect }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchPets = async () => {
    try {
      const data = await getPetsByCustomer();
      setPets(data || []);
    } catch (error) {
      console.error("Error fetching pets:", error);
      toast.error("Không thể tải danh sách thú cưng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleSelectPet = (pet) => {
    if (selectable && onSelect) {
      onSelect(pet);
      onClose(); // Đóng modal sau khi chọn
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white w-[90%] max-w-3xl p-6 rounded-lg shadow-lg relative">
          {/* Nút đóng */}
          <button
            className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-red-500"
            onClick={onClose}
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-4 text-orange-600">🐾 Your Pets</h2>

          {loading ? (
            <p className="text-gray-500">Đang tải danh sách thú cưng...</p>
          ) : pets.length === 0 ? (
            <p className="text-gray-500">Chưa có thú cưng nào.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
              {pets.map((pet) => (
                <div
                  key={pet._id}
                  onClick={() => handleSelectPet(pet)}
                  className={`border p-4 rounded shadow transition ${
                    selectable ? "cursor-pointer hover:bg-orange-100" : ""
                  }`}
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

          <div className="mt-6 text-center">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg"
              onClick={() => {
                toast.info("Mở form thêm mới");
                setShowAddForm(true);
              }}
            >
              ➕ Thêm thú cưng
            </button>
          </div>
        </div>
      </div>

      {/* Form thêm mới */}
      {showAddForm && (
        <AddPetForm
          onClose={() => setShowAddForm(false)}
          onAdded={fetchPets}
          addAndSelect={selectable} // Nếu từ Booking thì auto chọn pet
          onSelect={(pet) => {
            if (selectable && onSelect) {
              onSelect(pet);
              onClose();
            }
          }}
        />
      )}
    </>
  );
}
