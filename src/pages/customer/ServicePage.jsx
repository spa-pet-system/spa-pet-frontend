import MainLayout from "~/layouts/MainLayout";
import happyDog from "~/assets/happydog.jpg";
import tamImg from "~/assets/tam.jpg";
import groomingImg from "~/assets/grooming.jpg";
import AppointmentForm from "~/components/AppointmentForm";
import { useState } from "react";
import { useAuth } from "~/contexts/AuthProvider";

export default function ServicesPage() {
    const { user } = useAuth();
    const [openForm, setOpenForm] = useState(null); // null | 'Tắm cho Chó mèo' | 'Cắt tỉa lông cho Chó mèo'
    // Demo availableSlots, thực tế sẽ fetch theo ngày
    const demoSlots = { 9: 2, 10: 0, 11: 1, 12: 3, 13: 2, 14: 1, 15: 0, 16: 2, 17: 1 };
    return (
        <MainLayout>
            <div className="h-[600px]  bg-[rgb(162,199,236)] flex flex-col md:flex-row items-center px-6 md:px-28 pt-[140px]">
                <div className="flex-1 space-y-4 h-56">
                    <h1 className="text-5xl font-black leading-tight">
                        Services
                    </h1>
                    <p className="text-gray-700">
                        We are your local dog home boarding service giving you complete
                    </p>
                </div>
                <div className="flex-1 mt-10 md:mt-0">
                    <img
                        src=""
                        alt=""
                        className="w-full max-w-md mx-auto"
                    />
                </div>
            </div>
            {/* Bắt đầu bọc các section dưới bằng div padding */}
            <div className="px-1 md:px-24">
                {/* Section: Giới thiệu salon thú cưng */}
                <div className="bg-white rounded-2xl shadow-md p-6 mt-10 flex flex-col md:flex-row gap-8">
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
                            <b>Cắt lông cho chó mèo</b> là một vấn đề rất quan trọng. Việc đó đảm bảo sự phát triển về sức khỏe, thể chất và tinh thần cho thú cưng của bạn. Những thú cưng không được chăm sóc, cắt tỉa và làm đẹp thường có nguy cơ gặp phải bọ chét, ve rận, ký sinh trùng và các vấn đề về viêm da khác.
                        </p>
                        <p>
                            Việc sử dụng dịch vụ cắt tỉa lông chó mèo tại <b>Pet Spa</b> định kỳ và thường xuyên sẽ đem lại nhiều lợi ích thiết thực cho vật nuôi của bạn. Hãy lập kế hoạch đưa thú cưng của bạn đến với chúng tôi mỗi tuần nhé.
                        </p>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <img src={happyDog} alt="Happy Dog" className="rounded-xl shadow-lg max-w-xs w-full object-cover h-[400px]" />
                    </div>
                </div>   

                {/* Section: 3 cam kết với khách hàng */}
                <div className="bg-white rounded-2xl shadow-md p-6 mt-10">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span role="img" aria-label="like">👍</span>
                        3 ĐIỀU LUÔN CAM KẾT VỚI KHÁCH HÀNG
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-blue-900 text-white rounded-xl p-6 flex flex-col items-start">
                            <span className="text-2xl mb-2">💖</span>
                            <h3 className="font-bold text-lg mb-2">HẾT MÌNH VÌ CÔNG VIỆC</h3>
                            <p>Chúng tôi làm việc hết mình với chữ tâm, trách nhiệm và lòng yêu mến nghề. Thú cưng khỏe mạnh là niềm hạnh phúc của chúng tôi.</p>
                        </div>
                        <div className="bg-blue-900 text-white rounded-xl p-6 flex flex-col items-start">
                            <span className="text-2xl mb-2">✅</span>
                            <h3 className="font-bold text-lg mb-2">GIÁ DỊCH VỤ RẺ NHẤT</h3>
                            <p>Chúng tôi cam kết đưa ra mức giá ưu đãi nhất trên thị trường để tất cả thú cưng đều có cơ hội được trải nghiệm dịch vụ của chúng tôi.</p>
                        </div>
                        <div className="bg-blue-900 text-white rounded-xl p-6 flex flex-col items-start">
                            <span className="text-2xl mb-2">🏅</span>
                            <h3 className="font-bold text-lg mb-2">CHẤT LƯỢNG HÀNG ĐẦU</h3>
                            <p>Chúng tôi không ngừng nâng cao phát triển trình độ kỹ năng của nhân sự để phục vụ thú cưng đem đến kết quả tốt nhất cho công việc.</p>
                        </div>
                    </div>
                </div>

                 {/* Section: Giới thiệu dịch vụ Tắm cho Chó mèo */}
                 <div className="bg-white rounded-2xl shadow-md p-6 mt-10 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-[28px] font-bold mb-4 flex items-center gap-2">
                            <span role="img" aria-label="shower">🛁</span>
                            DỊCH VỤ TẮM CHO CHÓ MÈO CHUYÊN NGHIỆP
                        </h2>
                        <p className="mb-2">
                            Dịch vụ tắm cho chó mèo tại <b>Pet Spa</b> mang đến trải nghiệm sạch sẽ, thơm tho và an toàn tuyệt đối cho thú cưng của bạn. Chúng tôi sử dụng các sản phẩm chuyên dụng, không gây kích ứng da, phù hợp với từng loại lông và giống thú cưng.
                        </p>
                        <p className="mb-2">
                            Quy trình tắm bao gồm: kiểm tra sức khỏe tổng quát, chải lông gỡ rối, tắm bằng sữa tắm chuyên biệt, sấy khô, vệ sinh tai, cắt móng và xịt thơm. Đội ngũ nhân viên giàu kinh nghiệm sẽ chăm sóc nhẹ nhàng, giúp thú cưng cảm thấy thoải mái và thư giãn.
                        </p>
                        <p className="mb-4">
                            Hãy để thú cưng của bạn được tận hưởng dịch vụ tắm chuyên nghiệp, phòng tránh các bệnh về da và luôn sạch sẽ mỗi ngày!
                        </p>
                        <button className="mt-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all w-max" onClick={() => setOpenForm('Tắm cho Chó mèo')}>
                            Get Appointment
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <img src={tamImg} alt="Tắm cho chó mèo" className="rounded-xl shadow-lg max-w-xs w-full object-cover h-[400px]" />
                    </div>
                </div>

                {/* Section: Giới thiệu dịch vụ Cắt tỉa lông cho Chó mèo */}
                <div className="bg-white rounded-2xl shadow-md p-6 mt-10 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-[28px] font-bold mb-4 flex items-center gap-2">
                            <span role="img" aria-label="scissors">✂️</span>
                            DỊCH VỤ CẮT TỈA LÔNG CHO CHÓ MÈO CHUYÊN NGHIỆP
                        </h2>
                        <p className="mb-2">
                            Dịch vụ cắt tỉa lông tại <b>Pet Spa</b> giúp thú cưng của bạn luôn gọn gàng, sạch sẽ và nổi bật. Chúng tôi sử dụng dụng cụ chuyên dụng, quy trình an toàn, đảm bảo không gây đau rát hay tổn thương cho thú cưng.
                        </p>
                        <p className="mb-2">
                            Đội ngũ nhân viên giàu kinh nghiệm sẽ tư vấn kiểu lông phù hợp với từng giống chó mèo, giúp thú cưng không chỉ đẹp mà còn thoải mái, dễ vận động và phòng tránh các bệnh về da, ký sinh trùng.
                        </p>
                        <p className="mb-4">
                            Đặt lịch cắt tỉa lông định kỳ để thú cưng của bạn luôn khỏe mạnh, sạch sẽ và tự tin mỗi ngày!
                        </p>
                        <button className="mt-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all w-max" onClick={() => setOpenForm('Cắt tỉa lông cho Chó mèo')}>
                            Get Appointment
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <img src={groomingImg} alt="Cắt tỉa lông cho chó mèo" className="rounded-xl shadow-lg max-w-xs w-full object-cover h-[400px]" />
                    </div>
                </div>
            </div>
            {openForm && (
                <AppointmentForm
                    serviceName={openForm}
                    onClose={() => setOpenForm(null)}
                    availableSlots={demoSlots}
                    user={user || {}}
                />
            )}
        </MainLayout>
    );
}
