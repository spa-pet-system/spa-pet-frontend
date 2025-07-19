import MainLayout from "~/layouts/MainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServiceBySlug } from "~/services/serviceService";
import { FaClock, FaDollarSign, FaTag, FaUserFriends } from "react-icons/fa";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchServiceBySlug = async () => {
    try {
      const service = await getServiceBySlug(slug);
      console.log(`getServiceBySlug ${slug}: `, service);
      
      setService(service);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceBySlug();
  }, [slug]);

  return (
    <MainLayout>
      {/* Banner Header */}
      <div className="h-[600px] bg-gradient-to-r from-orange-100 to-white flex flex-col md:flex-row items-center px-6 md:px-28 pt-[140px]">
        <div className="flex-1 space-y-4 h-56">
          <h1 className="text-5xl font-black text-orange-600 leading-tight">
            {service ? service.name : "Dịch vụ"}
          </h1>
          <p className="text-gray-700 text-lg">
            {service ? service.description : "Đang tải mô tả dịch vụ..."}
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full">
              Get Appointment
            </button>
        </div>
        <div className="flex-1 mt-10 md:mt-0">
          {service?.image && (
            <img
              src={service.image}
              alt={service.name}
              className="w-full max-w-md mx-auto rounded-xl shadow-xl object-cover h-[320px]"
            />
          )}
        </div>
      </div>

      {/* Service Detail Content */}
      <div className="px-6 md:px-28 py-12 bg-white">
        {loading ? (
          <p className="text-gray-500">Đang tải chi tiết dịch vụ...</p>
        ) : service ? (
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-orange-600 border-b pb-2">
              Thông tin chi tiết
            </h2>

            {/* Các bước thực hiện */}
            {service.detail && (
              <div>
                <h3 className="text-2xl font-semibold text-orange-500 mb-4">Quy trình dịch vụ</h3>
                <div className="space-y-4">
                  {service.detail
                    .split("|")
                    .filter(step => step.trim() !== "")
                    .map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-orange-50 p-4 rounded-lg shadow-sm border-l-4 border-orange-400"
                      >
                        <div className="text-orange-600 font-bold text-lg">{index + 1}.</div>
                        <div className="text-gray-800">{step.trim()}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Thông tin chung */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 mt-8">
              <div className="flex items-start gap-3">
                <FaTag className="text-2xl text-orange-500 mt-1" />
                <div>
                  <p className="font-semibold text-orange-700">Loại dịch vụ:</p>
                  <p>{service.type === "grooming" ? "Cắt tỉa lông" : "Tắm thú cưng"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaClock className="text-2xl text-orange-500 mt-1" />
                <div>
                  <p className="font-semibold text-orange-700">Thời lượng:</p>
                  <p>{service.duration} phút</p>
                </div>
              </div>
{/* 
              <div className="flex items-start gap-3">
                <FaDollarSign className="text-2xl text-orange-500 mt-1" />
                <div>
                  <p className="font-semibold text-orange-700">Giá:</p>
                  <p>{service.price.toLocaleString()} VNĐ</p>
                </div>
              </div> */}

              <div className="flex items-start gap-3">
                <FaUserFriends className="text-2xl text-orange-500 mt-1" />
                <div>
                  <p className="font-semibold text-orange-700">Số slot mỗi giờ:</p>
                  <p>{service.slot} lượt</p>
                </div>
              </div>
            </div>

            {!service.isActive && (
              <div className="p-4 bg-orange-100 text-orange-700 rounded-lg text-center font-semibold mt-6">
                ⚠️ Dịch vụ này hiện đang tạm ngưng hoạt động.
              </div>
            )}
          </div>
        ) : (
          <p className="text-red-500">Không tìm thấy dịch vụ.</p>
        )}
      </div>
    </MainLayout>
  );
}
