import { useEffect, useState } from "react";
import { getServices } from "~/services/serviceService";
import { getSlotStatus } from "~/services/appointmentService";
import { getTodayVN } from "~/utils/DateVN"

export default function BookingStep1({
  selectedService,
  setSelectedService,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) {

  const [services, setServices] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [slotStatus, setSlotStatus] = useState({});

  useEffect(() => {
    const fetchServices = async () => {
      const res = await getServices();
      setServices(res);

      // Mặc định chọn dịch vụ đầu tiên
      if (res.length > 0 && !selectedService) {
        setSelectedService(res[0]._id);
      }

      // Mặc định chọn ngày hôm nay
      if (!selectedDate) {
        setSelectedDate(getTodayVN());
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchSlotData = async () => {
      if (selectedService && selectedDate) {
        try {
          const data = await getSlotStatus(selectedService, selectedDate);
          console.log(data);
          
          setSlotStatus(data);
        } catch (err) {
          console.error("Lỗi khi load slot:", err);
          setSlotStatus({});
        }
      }
    };
    fetchSlotData();
  }, [selectedService, selectedDate]);

  useEffect(() => {
    if (services.length > 0 && !selectedService) {
      setSelectedService(services[0]._id);
    }
  }, [services, selectedService]);

  useEffect(() => {
    if (selectedService && services.length > 0) {
      const currentService = services.find(s => s._id === selectedService || s._id === selectedService);
      if (currentService?.timeSlots) {
        setTimeSlots(currentService.timeSlots);
      } else {
        setTimeSlots([]); // reset nếu không có
      }
    }
  }, [selectedService, services]);


  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-orange-600">Chọn dịch vụ</h2>
      <select
        className="border p-2 w-full"
        value={selectedService || ""}
        onChange={(e) => {
          setSelectedService(e.target.value);
          setSelectedTime(null); // reset time khi đổi service
        }}
      >
        <option value="" disabled>-- Chọn dịch vụ --</option>
        {services.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      <h2 className="text-xl font-semibold text-orange-600">Chọn ngày</h2>
      <input
        type="date"
        className="border p-2 w-full"
        value={selectedDate || ""}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          setSelectedTime(null); // reset time khi đổi ngày
        }}
        min={getTodayVN()}
      />

      <h2 className="text-xl font-semibold text-orange-600">Chọn khung giờ</h2>
      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((slot) => {
          const isFull = slotStatus[slot] >= 3;
          return (
            <button
              key={slot}
              disabled={isFull}
              className={`p-2 rounded border transition text-sm ${isFull
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : selectedTime === slot
                    ? "bg-yellow-500 text-white"
                    : "bg-white hover:bg-yellow-100"
                }`}
              onClick={() => !isFull && setSelectedTime(slot)}
            >
              {slot}
              {isFull && <span className="ml-1">(Full)</span>}
            </button>
          );
        })}
      </div>
      {selectedTime && (
        <p className="text-sm text-gray-600 mt-2">
          Còn lại: <span className="font-semibold text-orange-600">{3 - (slotStatus[selectedTime] || 0)}</span> slot
        </p>
      )}
    </div>
  );
}
