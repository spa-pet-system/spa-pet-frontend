import { useState } from "react";
import { toast } from "react-toastify";
import { createPet } from "~/services/petService";

export default function AddPetForm({ onClose, onAdded, addAndSelect = false, onSelect }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    petType: "dog",
    breed: "",
    age: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("petType", formData.petType);
      submitData.append("breed", formData.breed);
      submitData.append("age", formData.age);
      submitData.append("weight", formData.weight);
      if (selectedFile) {
        submitData.append("image", selectedFile);
      }

      console.log("📦 FormData gửi đi:");
      for (let pair of submitData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const newPet = await createPet(submitData);
      toast.success("🐶 Thêm thú cưng thành công!");

      if (onAdded) onAdded();
      if (addAndSelect && onSelect) onSelect(newPet);

      onClose();
    } catch (err) {
      toast.error("❌ Thêm thú cưng thất bại.");
      console.error(err);
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
          {/* Tên thú cưng */}
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

          {/* Loại thú */}
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

          {/* Giống */}
          <div>
            <label className="block font-semibold">Giống</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Poodle, Phốc Sóc..."
            />
          </div>

          {/* Tuổi & Cân nặng */}
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

          {/* Ảnh */}
          <div>
            <label className="block font-semibold mb-1">Ảnh thú cưng (chọn từ máy)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.type.startsWith("image/")) {
                  setSelectedFile(file);
                } else {
                  toast.error("❌ File không hợp lệ!");
                }
              }}
              className="w-full border px-3 py-2 rounded"
            />
            {selectedFile && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-1">📸 Xem trước ảnh:</p>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>

          {/* Submit */}
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
