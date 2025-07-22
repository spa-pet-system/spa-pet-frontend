import { useState } from "react";
import { toast } from "react-toastify";
import { createPet } from "~/services/petService";

export default function AddPetForBooking({ onClose, onAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    petType: "dog",
    breed: "",
    age: "",
    weight: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPet = await createPet(formData);
      console.log("NEW-PET: ", newPet);
      
      toast.success("🐾 Thêm thú cưng thành công!");
      if (onAdded) onAdded(newPet); // Gửi pet mới lên cho modal xử lý
      onClose(); // Đóng form
    } catch (error) {
      toast.error("❌ Thêm thất bại!");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg relative">
        <button
          className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-orange-600 mb-4">➕ Thêm thú cưng</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Tên thú cưng</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Milu"
            />
          </div>

          <div>
            <label className="block font-semibold">Loại</label>
            <select
              name="petType"
              value={formData.petType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="dog">Chó</option>
              <option value="cat">Mèo</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Giống</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Phốc Sóc"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Tuổi (năm)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                min={0}
              />
            </div>
            <div>
              <label className="block font-semibold">Cân nặng (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                step={0.1}
                min={0}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold">Link ảnh (tuỳ chọn)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="https://..."
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
