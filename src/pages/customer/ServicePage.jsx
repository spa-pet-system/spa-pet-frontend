import MainLayout from "~/layouts/MainLayout";
import happyDog from "~/assets/happydog.jpg";
import happyDog1 from "~/assets/happydog1.jpg";
import AppointmentForm from "~/components/service/AppointmentForm";
import ServiceCard from "~/components/service/ServiceCard";
import { useState, useEffect } from "react";
import { useAuth } from "~/contexts/AuthProvider";
import useInView from "~/utils/useInView";
import axios from "axios";
import { getServices } from "~/services/serviceService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


export default function ServicesPage() {
    const { user } = useAuth();
    const [openForm, setOpenForm] = useState(null); // service object hoặc null
    const [services, setServices] = useState([]);
    const demoSlots = { 9: 2, 10: 0, 11: 1, 12: 3, 13: 2, 14: 1, 15: 0, 16: 2, 17: 1 };

    // Scroll reveal hooks
    const [introRef, introInView] = useInView({ threshold: 0.15 });
    const [commitRef, commitInView] = useInView({ threshold: 0.15 });

    useEffect(() => {
        async function fetchServices() {
            try {
                const services = await getServices()
                setServices(services)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchServices()
    }, [])

    return (
        <MainLayout>
            {/* <div className="h-[600px] bg-[rgb(162,199,236)] flex flex-col md:flex-row items-center px-6 md:px-28 pt-[140px]">
                <div className="flex-1 space-y-4 h-56">
                    <h1 className="text-5xl font-black leading-tight">Services</h1>
                    <p className="text-gray-700">
                        We are your local dog home boarding service giving you complete
                    </p>
                </div>
                <div className="flex-1 mt-10 md:mt-0">
                    <img src="" alt="" className="w-full max-w-md mx-auto" />
                </div>
            </div> */}


            <div className="px-6 md:px-28 pt-[0]">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop
                    className="w-full h-full rounded-xl overflow-hidden shadow-xl"
                >
                    <SwiperSlide>
                        <img
                            src="/images/pro_service_1.png"
                            alt="Banner 1"
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="/images/pro_service_2.png"
                            alt="Banner 2"
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="/images/pro_service_3.png"
                            alt="Banner 3"
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>



            <div className="px-1 md:px-24">
                {/* Section: Giới thiệu salon thú cưng */}
                <div
                    ref={introRef}
                    className={`bg-white rounded-2xl shadow-md p-6 mt-10 flex flex-col md:flex-row gap-8 transition-all duration-700
                    ${introInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <div className="flex-1">
                        <h2 className="text-[28px] font-bold mb-4 flex items-center gap-2">
                            <span role="img" aria-label="pet">🐶🐱</span>
                            PET SALON HÀNG ĐẦU CHO THÚ CƯNG
                        </h2>
                        <p className="mb-2">
                            Bạn đang tìm kiếm địa chỉ cung cấp <b>dịch vụ cắt tỉa lông chó mèo</b> chuyên nghiệp gần đây? Tại <b>Pet Spa</b>, chúng tôi cung cấp đầy đủ tất cả các loại hình dịch vụ chăm sóc và làm đẹp trọn gói tốt nhất dành cho thú cưng.
                        </p>
                        <p className="mb-2">
                            Chúng tôi tự hào cung cấp dịch vụ và các sản phẩm chăm sóc thú cưng không chứa paraben, phthalates và thuốc nhuộm hóa học.
                        </p>
                        <p className="mb-2">
                            <b>Cắt lông cho chó mèo</b> là một vấn đề rất quan trọng. Việc đó đảm bảo sự phát triển về sức khỏe, thể chất và tinh thần cho thú cưng của bạn.
                        </p>
                        <p>
                            Việc sử dụng dịch vụ cắt tỉa lông chó mèo tại <b>Pet Spa</b> định kỳ và thường xuyên sẽ đem lại nhiều lợi ích thiết thực.
                        </p>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <img src={happyDog1} alt="Happy Dog" className="rounded-xl shadow-lg max-w-xs w-full object-cover h-[400px]" />
                    </div>
                </div>

                {/* Section: 3 cam kết với khách hàng */}
                <div
                    ref={commitRef}
                    className={`bg-white rounded-2xl shadow-md p-6 mt-10 transition-all duration-700
                    ${commitInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span role="img" aria-label="like">👍</span>
                        3 ĐIỀU LUÔN CAM KẾT VỚI KHÁCH HÀNG
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-sky-800 text-white rounded-xl p-6 flex flex-col items-start">
                            <span className="text-2xl mb-2">💖</span>
                            <h3 className="font-bold text-lg mb-2">HẾT MÌNH VÌ CÔNG VIỆC</h3>
                            <p>Chúng tôi làm việc hết mình với chữ tâm, trách nhiệm và lòng yêu mến nghề.</p>
                        </div>
                        <div className="bg-sky-800 text-white rounded-xl p-6 flex flex-col items-start">
                            <span className="text-2xl mb-2">✅</span>
                            <h3 className="font-bold text-lg mb-2">GIÁ DỊCH VỤ RẺ NHẤT</h3>
                            <p>Chúng tôi cam kết đưa ra mức giá ưu đãi nhất trên thị trường.</p>
                        </div>
                        <div className="bg-sky-800 text-white rounded-xl p-6 flex flex-col items-start">
                            <span className="text-2xl mb-2">🏅</span>
                            <h3 className="font-bold text-lg mb-2">CHẤT LƯỢNG HÀNG ĐẦU</h3>
                            <p>Chúng tôi không ngừng nâng cao kỹ năng để đem đến kết quả tốt nhất.</p>
                        </div>
                    </div>
                </div>

                {/* Section: Services được load từ DB */}
                <div className="mt-10 grid grid-cols-1 gap-10">
                    {services.map(service => (
                        <ServiceCard
                            key={service._id}
                            service={service}
                            onBook={() => setOpenForm(service)}
                            onClickDetail={() => console.log(service.slug)}
                        />
                    ))}
                </div>
            </div>

            {openForm && (
                <AppointmentForm
                    serviceName={openForm.name}
                    onClose={() => setOpenForm(null)}
                    availableSlots={demoSlots}
                    user={user || {}}
                />
            )}
        </MainLayout>
    );
}
