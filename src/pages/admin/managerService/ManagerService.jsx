import { useEffect, useState } from "react";
import axios from "~/api/axiosClient";
import SidebarAdmin from "~/components/SidebarAdmin";
import { useNavigate } from "react-router-dom";

const ManagerService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/admin/services");
      setServices(res.data);
    } catch (err) {
      alert("Lỗi tải danh sách dịch vụ");
    }
    setLoading(false);
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await axios.patch(`/admin/services/${id}/${isActive ? "deactivate" : "activate"}`);
      fetchServices();
    } catch (err) {
      alert("Lỗi cập nhật trạng thái dịch vụ");
    }
  };

  const handleAddService = () => {
    navigate("/admin/services/add");
  };

  const handleEditService = (id) => {
    navigate(`/admin/services/edit/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <main className="flex-1 p-8 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-orange-600">Quản lý dịch vụ</h2>
            <button onClick={handleAddService} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold">+ Thêm dịch vụ</button>
          </div>
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 text-center">Danh sách dịch vụ</h3>
            {loading ? (
              <div>Đang tải...</div>
            ) : (
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 border text-center">STT</th>
                    <th className="px-3 py-2 border text-center">Tên</th>
                    <th className="px-3 py-2 border text-center">Loại</th>
                    <th className="px-3 py-2 border text-center">Giá</th>
                    <th className="px-3 py-2 border text-center">Thời lượng (phút)</th>
                    <th className="px-3 py-2 border text-center">Trạng thái</th>
                    <th className="px-3 py-2 border text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, idx) => (
                    <tr key={service._id} className="hover:bg-orange-50 transition">
                      <td className="px-3 py-2 border text-center">{idx + 1}</td>
                      <td className="px-3 py-2 border">{service.name}</td>
                      <td className="px-3 py-2 border">{service.type}</td>
                      <td className="px-3 py-2 border">{service.price.toLocaleString()} đ</td>
                      <td className="px-3 py-2 border text-center">{service.duration}</td>
                      <td className="px-3 py-2 border text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${service.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {service.isActive ? "Đang hoạt động" : "Đã ẩn"}
                        </span>
                      </td>
                      <td className="px-3 py-2 border flex gap-2 justify-center">
                        <button
                          className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium"
                          onClick={() => handleEditService(service._id)}
                        >
                          Sửa
                        </button>
                        <button
                          className={`px-3 py-1 rounded text-white text-xs font-medium ${service.isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                          onClick={() => handleToggleActive(service._id, service.isActive)}
                        >
                          {service.isActive ? "Ẩn" : "Kích hoạt"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerService; 