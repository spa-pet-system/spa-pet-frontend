import React, { useState } from "react";

export default function AppointmentForm({ serviceName, onClose, availableSlots = {}, user = {} }) {
  const [date, setDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      serviceName,
      name: user.name,
      phone: user.phone,
      date,
      hour: selectedHour,
      slotsLeft: availableSlots[selectedHour] || 0,
    });
    onClose();
  };

  const hours = Array.from({ length: 9 }, (_, i) => 9 + i); // 9h -> 17h

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose}></div>
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <form
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative z-50"
          onSubmit={handleSubmit}
          onClick={e => e.stopPropagation()}
        >
          <button type="button" className="absolute top-3 right-4 text-2xl" onClick={onClose}>&times;</button>
          <h2 className="text-2xl font-bold mb-6 text-center">Đặt lịch dịch vụ</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Dịch vụ</label>
            <input type="text" value={serviceName} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Họ tên</label>
            <input type="text" value={user.name || ""} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
            <input type="text" value={user.phone || ""} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Ngày đặt lịch</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Chọn khung giờ</label>
            <div className="grid grid-cols-3 gap-2">
              {hours.map(hour => {
                const slot = availableSlots[hour] || 0;
                const disabled = slot === 0;
                return (
                  <button
                    type="button"
                    key={hour}
                    disabled={disabled}
                    onClick={() => setSelectedHour(hour)}
                    className={`px-2 py-2 rounded border text-sm font-semibold transition-all
                      ${disabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : selectedHour === hour ? "bg-blue-600 text-white" : "bg-white hover:bg-blue-100"}`}
                  >
                    {hour}:00
                  </button>
                );
              })}
            </div>
            {selectedHour && (
              <div className="mt-2 text-sm text-gray-600">
                Còn lại <span className="font-bold">{availableSlots[selectedHour] || 0}</span> phòng trống cho khung giờ này.
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-all disabled:opacity-60"
            disabled={!date || !selectedHour}
          >
            Xác nhận đặt lịch
          </button>
        </form>
      </div>
    </>
  );
} 