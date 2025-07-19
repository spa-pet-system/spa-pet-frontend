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
    <div className="max-w-5xl mx-auto p-4 mt-[140px]">
      {/* Step indicator */}
      <div className="flex justify-between items-center mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold border-2 ${
              step === s ? 'bg-yellow-600 text-white' : 'border-gray-400 text-gray-600'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Step content */}
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

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Quay lại
          </button>
        )}
        {step < 3 && (
          <button
            onClick={handleNext}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded ml-auto"
          >
            Tiếp theo
          </button>
        )}
      </div>
    </div>
    </MainLayout>
  );
}
