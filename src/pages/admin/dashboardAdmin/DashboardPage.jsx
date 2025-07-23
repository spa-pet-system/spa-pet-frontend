import SidebarAdmin from "~/components/SidebarAdmin";
import { FaUsers, FaShoppingCart, FaMoneyBillWave, FaDog, FaConciergeBell } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { orderService, userService, petService, serviceService } from "~/services";
import axios from "~/api/axiosClient";
Chart.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [petCount, setPetCount] = useState(0);
  const [activeServiceCount, setActiveServiceCount] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);
  const [latestServices, setLatestServices] = useState([]);
 

  useEffect(() => {
    orderService.getOrderCount()
      .then((count) => setOrderCount(count))
      .catch(() => setOrderCount(0));
    userService.getCustomerCount()
      .then((count) => setCustomerCount(count))
      .catch(() => setCustomerCount(0));
    orderService.getTotalRevenue()
      .then((total) => setRevenue(total))
      .catch(() => setRevenue(0));
    petService.getTotalPets()
      .then((count) => setPetCount(count))
      .catch(() => setPetCount(0));
    serviceService.getActiveServiceCount()
      .then((count) => setActiveServiceCount(count))
      .catch(() => setActiveServiceCount(0));
    // Lấy sản phẩm mới nhất (dùng endpoint admin)
    axios.get("/admin/products")
      .then((res) => setLatestProducts(res.data.slice(0, 5)))
      .catch(() => setLatestProducts([]));
    // Lấy dịch vụ mới nhất
    serviceService.getServices()
      .then((data) => setLatestServices(data.slice(0, 5)))
      .catch(() => setLatestServices([]));
  }, []);

  const stats = [
    { label: 'Khách hàng', value: customerCount, icon: <FaUsers className="text-blue-500" /> },
    { label: 'Tổng đơn hàng', value: orderCount, icon: <FaShoppingCart className="text-green-500" /> },
    { label: 'Doanh thu', value: revenue.toLocaleString('vi-VN') + '₫', icon: <FaMoneyBillWave className="text-yellow-500" /> },
    { label: 'Thú cưng đã phục vụ', value: petCount, icon: <FaDog className="text-pink-500" /> },
    { label: 'Dịch vụ đang hoạt động', value: activeServiceCount, icon: <FaConciergeBell className="text-purple-500" /> },
  ];

  // Dữ liệu mẫu cho chart
  const revenueDataSample = {
    labels: ["Tuần trước", "Tuần này"],
    datasets: [
      {
        data: [30000000, 50000000],
        backgroundColor: ["#fdba74", "#f97316"],
        borderWidth: 2,
      },
    ],
  };

  const ordersDataSample = {
    labels: ["Tuần trước", "Tuần này"],
    datasets: [
      {
        data: [120, 180],
        backgroundColor: ["#93c5fd", "#2563eb"],
        borderWidth: 2,
      },
    ],
  };

  const customerChartData = {
    labels: ["Tuần trước", "Tuần này"],
    datasets: [
      {
        data: [120, 180],
        backgroundColor: ["#93c5fd", "#2563eb"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <SidebarAdmin />
      <main className="flex-1 p-8 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-orange-600 text-center drop-shadow">Dashboard Admin</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {stats.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1 border-b-4 border-orange-200"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <div className="text-gray-500 text-sm">{item.label}</div>
                  <div className="text-2xl font-bold text-gray-800">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Quick Stats Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Sản phẩm mới nhất */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                <span className="inline-block w-2 h-6 bg-orange-400 rounded-full mr-2"></span>
                <span>Sản phẩm mới nhất</span>
              </div>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-2 text-center">Ảnh</th>
                    <th className="px-2 py-2 text-left">Tên</th>
                    <th className="px-2 py-2 text-center">Giá</th>
                    <th className="px-2 py-2 text-center">Tồn kho</th>
                  </tr>
                </thead>
                <tbody>
                  {latestProducts.map((product) => (
                    <tr key={product._id} className="border-b hover:bg-orange-50 transition">
                      <td className="px-2 py-2 text-center">
                        <img
                          src={product.images?.[0] || "/default-product.jpg"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-xl border shadow mx-auto"
                        />
                      </td>
                      <td className="px-2 py-2 font-semibold text-gray-800 max-w-[120px] truncate">{product.name}</td>
                      <td className="px-2 py-2 text-center">
                        <span className="font-bold text-orange-600">{product.price?.toLocaleString()}₫</span>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <span className={`inline-block px-2 py-1 rounded font-bold text-xs ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{product.stock}</span>
                      </td>
                    </tr>
                  ))}
                  {latestProducts.length === 0 && (
                    <tr><td colSpan={4} className="text-center text-gray-400 py-2">Không có dữ liệu</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Dịch vụ mới nhất */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                <span className="inline-block w-2 h-6 bg-blue-400 rounded-full mr-2"></span>
                <span>Dịch vụ mới nhất</span>
              </div>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-2 text-center">#</th>
                    <th className="px-2 py-2 text-left">Tên</th>
                    <th className="px-2 py-2 text-center">Loại</th>
                    <th className="px-2 py-2 text-center">Thời lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {latestServices.map((service, idx) => (
                    <tr key={service._id} className="border-b hover:bg-blue-50 transition">
                      <td className="px-2 py-2 text-center font-bold text-blue-400">{idx + 1}</td>
                      <td className="px-2 py-2 font-semibold text-gray-800 max-w-[120px] truncate flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-blue-300 rounded-full"></span>
                        {service.name}
                      </td>
                      <td className="px-2 py-2 text-center">
                        <span className={`inline-block px-2 py-1 rounded-xl font-semibold text-xs ${service.type === 'grooming' ? 'bg-pink-100 text-pink-700' : 'bg-yellow-100 text-yellow-700'}`}>{service.type}</span>
                      </td>
                      <td className="px-2 py-2 text-center">{service.duration} phút</td>
                    </tr>
                  ))}
                  {latestServices.length === 0 && (
                    <tr><td colSpan={4} className="text-center text-gray-400 py-2">Không có dữ liệu</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center">
              <div className="text-lg font-semibold mb-4 text-gray-700">Biểu đồ doanh thu</div>
              <div className="w-64 h-64">
                <Doughnut data={revenueDataSample} />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center">
              <div className="text-lg font-semibold mb-4 text-gray-700">Biểu đồ số lượng đơn hàng</div>
              <div className="w-64 h-64">
                <Doughnut data={ordersDataSample} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage; 

