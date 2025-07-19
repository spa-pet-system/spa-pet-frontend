import { useEffect, useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BookingFloatingButton() {
    const [showText, setShowText] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setShowText(true);
            setTimeout(() => setShowText(false), 3000); // hiển thị 3s
        }, 5000); // mỗi 5s sẽ hiện lại

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-end justify-end">
            {/* Text box xuất hiện bên trái phía trên */}
            <div className="relative">
                {showText && (
                    <div className="absolute -top-8 right-14 bg-yellow-100 text-orange-800 px-4 py-2 rounded shadow transition-all duration-300 whitespace-nowrap">
                        Đặt lịch spa ngay tại đây!
                    </div>
                )}

                {/* Icon hình tròn cố định */}
                <button
                    onClick={() => navigate("/get-appointment")}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl transition animate-gentleBounce"
                >
                    <FaCalendarCheck className="text-2xl" />
                </button>

            </div>
        </div>
    );
}
