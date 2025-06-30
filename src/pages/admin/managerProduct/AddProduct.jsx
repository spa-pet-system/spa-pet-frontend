import { useState } from "react";
import axios from "~/api/axiosClient";
import SidebarAdmin from "~/components/SidebarAdmin";
import { useNavigate } from "react-router-dom";

const CATEGORY_OPTIONS = [
  "Clothing",
  "Leashes and Muzzles",
  "Feeding Tools",
  "Pet Toys",
  "Beds and Mats"
];

const initialState = {
  name: "",
  description: "",
  price: "",
  discount: 0,
  stock: 0,
  category: CATEGORY_OPTIONS[0],
  images: []
};

const AddProduct = () => {
  const [form, setForm] = useState(initialState);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Tên sản phẩm là bắt buộc";
    if (!form.description.trim()) newErrors.description = "Mô tả là bắt buộc";
    if (form.price === "" || isNaN(form.price) || Number(form.price) < 0) newErrors.price = "Giá phải là số không âm";
    if (form.discount !== "" && (isNaN(form.discount) || Number(form.discount) < 0 || Number(form.discount) > 100)) newErrors.discount = "Giảm giá phải từ 0-100";
    if (form.stock !== "" && (isNaN(form.stock) || Number(form.stock) < 0)) newErrors.stock = "Tồn kho phải là số không âm";
    if (!form.category) newErrors.category = "Danh mục là bắt buộc";
    if (imageUrls.length === 0) newErrors.images = "Cần chọn ít nhất 1 ảnh";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageFilesChange = async (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setUploading(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("/admin/products/upload-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        });
        uploadedUrls.push(res.data.url);
      }
      setImageUrls(uploadedUrls);
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
      await axios.post("/admin/products", {
        ...form,
        price: Number(form.price),
        discount: Number(form.discount),
        stock: Number(form.stock),
        images: imageUrls
      });
      navigate("/admin/products");
    } catch (err) {
      alert("Lỗi thêm sản phẩm");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <main className="flex-1 p-8 flex flex-col items-center">
        <div className="w-full max-w-xl bg-white rounded-lg shadow p-8">
          <button className="mb-4 text-blue-500 hover:underline" onClick={() => navigate(-1)}>&larr; Quay lại</button>
          <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">Thêm sản phẩm mới</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Tên sản phẩm <span className="text-red-500">*</span></label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
              {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Mô tả <span className="text-red-500">*</span></label>
              <textarea name="description" value={form.description} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
              {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Giá (VNĐ) <span className="text-red-500">*</span></label>
              <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required className="w-full border rounded px-3 py-2" placeholder="Nhập giá sản phẩm" />
              {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Giảm giá (%)</label>
              <input name="discount" type="number" min="0" max="100" value={form.discount} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Nhập % giảm giá" />
              {errors.discount && <div className="text-red-500 text-sm mt-1">{errors.discount}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Tồn kho</label>
              <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Nhập số lượng tồn kho" />
              {errors.stock && <div className="text-red-500 text-sm mt-1">{errors.stock}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Danh mục <span className="text-red-500">*</span></label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-3 py-2">
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <div className="text-red-500 text-sm mt-1">{errors.category}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Ảnh sản phẩm (có thể chọn nhiều ảnh) <span className="text-red-500">*</span></label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageFilesChange}
                disabled={uploading}
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {imageUrls.map((url, idx) => (
                  <img key={idx} src={url} alt="preview" className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
              {errors.images && <div className="text-red-500 text-sm mt-1">{errors.images}</div>}
              {uploading && <span className="text-xs text-gray-500 ml-2">Đang upload...</span>}
            </div>
            <button type="submit" disabled={loading || uploading} className="w-full py-2 rounded text-white font-semibold bg-orange-500 hover:bg-orange-600">
              {loading ? "Đang lưu..." : "Thêm sản phẩm"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct; 