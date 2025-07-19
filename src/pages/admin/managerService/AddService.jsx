import { useState } from "react";
import axios from "~/api/axiosClient";
import SidebarAdmin from "~/components/SidebarAdmin";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  type: "grooming",
  description: "",
  detail: "",
  // price: "",
  duration: "",
  image: "",
  slot: "",
  isActive: true
};

const AddService = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Tên dịch vụ là bắt buộc";
    if (!form.type) newErrors.type = "Loại dịch vụ là bắt buộc";
    if (!form.description.trim()) newErrors.description = "Mô tả là bắt buộc";
    // if (form.price === "" || isNaN(form.price) || Number(form.price) < 0) newErrors.price = "Giá phải là số không âm";
    if (form.duration === "" || isNaN(form.duration) || Number(form.duration) < 1) newErrors.duration = "Thời lượng phải là số >= 1";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/admin/services/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      const url = res.data.url;
      setForm((prev) => ({ ...prev, image: url }));
    } catch (err) {
      alert("Lỗi upload ảnh");
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    try {
      await axios.post("/admin/services", {
        ...form,
        // price: Number(form.price),
        duration: Number(form.duration)
      });
      navigate("/admin/services");
    } catch (err) {
      alert("Lỗi thêm dịch vụ");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <main className="flex-1 p-8 flex flex-col items-center">
        <div className="w-full max-w-xl bg-white rounded-lg shadow p-8">
          <button className="mb-4 text-blue-500 hover:underline" onClick={() => navigate(-1)}>&larr; Quay lại</button>
          <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">Thêm dịch vụ mới</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Tên dịch vụ <span className="text-red-500">*</span></label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
              {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Loại dịch vụ <span className="text-red-500">*</span></label>
              <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="grooming">Grooming</option>
                <option value="washing">Washing</option>
              </select>
              {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Mô tả <span className="text-red-500">*</span></label>
              <textarea name="description" value={form.description} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
              {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Chi tiết</label>
              <textarea name="detail" value={form.detail} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            {/* <div>
              <label className="block font-medium mb-1">Giá (VNĐ) <span className="text-red-500">*</span></label>
              <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required className="w-full border rounded px-3 py-2" placeholder="Nhập giá dịch vụ" />
              {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
            </div> */}
            <div>
              <label className="block font-medium mb-1">Thời lượng (phút) <span className="text-red-500">*</span></label>
              <input name="duration" type="number" min="1" value={form.duration} onChange={handleChange} required className="w-full border rounded px-3 py-2" placeholder="Nhập thời lượng" />
              {errors.duration && <div className="text-red-500 text-sm mt-1">{errors.duration}</div>}
            </div>
             <div>
              <label className="block font-medium mb-1">Số Slot <span className="text-red-500">*</span></label>
              <input name="slot" type="number" min="1" value={form.slot} onChange={handleChange} required className="w-full border rounded px-3 py-2" placeholder="Nhập thời lượng" />
              {errors.duration && <div className="text-red-500 text-sm mt-1">{errors.duration}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Ảnh dịch vụ (chỉ chọn từ máy)</label>
              <div className="flex gap-2 mb-2 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  disabled={uploading}
                />
                {form.image && form.image.startsWith("http") && (
                  <img src={form.image} alt="preview" className="w-16 h-16 object-cover rounded" />
                )}
                {uploading && <span className="text-xs text-gray-500 ml-2">Đang upload...</span>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} id="isActive" />
              <label htmlFor="isActive">Kích hoạt</label>
            </div>
            <button type="submit" disabled={loading || uploading} className="w-full py-2 rounded text-white font-semibold bg-orange-500 hover:bg-orange-600">
              {loading ? "Đang lưu..." : "Thêm dịch vụ"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddService; 