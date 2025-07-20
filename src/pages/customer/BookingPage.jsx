import { useState } from 'react';
import BookingStep1 from '~/components/booking/BookingStep1';
import BookingStep2 from '~/components/booking/BookingStep2';
import BookingStep3 from '~/components/booking/BookingStep3';
import MainLayout from '~/layouts/MainLayout';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({});

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <MainLayout>
      {/* Background gradient riêng cho BookingPage */}
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-10">
        <div className="max-w-5xl mx-auto px-4">

          {/* Step indicator */}
          <div className="relative flex justify-between items-center mb-8 px-6">
            {/* Đường line giữa các bước */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 transform -translate-y-1/2 z-0"></div>

            {[1, 2, 3].map((s) => (
              <div key={s} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full font-bold border-2 transition-all ${step === s
                      ? 'bg-yellow-600 text-white border-yellow-600 scale-110'
                      : 'border-gray-400 text-gray-600 bg-white'
                    }`}
                >
                  {s}
                </div>
              </div>
            ))}
          </div>


          {/* Title theo từng bước */}
          <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">
            {step === 1 && 'Chọn dịch vụ và thời gian'}
            {step === 2 && 'Thông tin người đặt và thú cưng'}
            {step === 3 && 'Xác nhận đặt lịch'}
          </h2>

          {/* Nội dung từng bước */}
          <div className="bg-white shadow-xl rounded-xl p-6">
            {step === 1 && (
              <BookingStep1
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            )}
            {step === 2 && (
              <BookingStep2
                formData={formData}
                setFormData={setFormData}
                selectedService={selectedService}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            )}
            {step === 3 && (
              <BookingStep3
                selectedService={selectedService}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                formData={formData}
              />
            )}
          </div>

          {/* Nút điều hướng */}
          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded text-gray-700 font-semibold"
              >
                ← Quay lại
              </button>
            )}
            {step < 3 && (
              <button
                onClick={handleNext}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded font-semibold ml-auto flex items-center gap-1"
              >
                Tiếp theo <span>▶</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
