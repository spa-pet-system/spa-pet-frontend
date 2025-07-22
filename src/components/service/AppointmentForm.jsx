import React, { useState } from 'react';

const HOURS = Array.from({ length: 9 }, (_, i) => i + 9); // 9 -> 17

export default function AppointmentForm({ serviceName, onClose, user, availableSlots }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState(null);
  const [petOption, setPetOption] = useState('existing');
  const [selectedPet, setSelectedPet] = useState('');
  const [newPet, setNewPet] = useState({ name: '', type: '', weight: '' });

  const fakePetList = ['Mèo Mướp', 'Chó Poodle'];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white max-w-3xl w-full mx-4 md:mx-0 p-6 rounded-2xl shadow-xl animate-fade-in relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-700">🐾 Đặt lịch: {serviceName}</h2>

        {step === 1 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Chọn ngày và giờ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label className="block font-medium mb-1">Ngày</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedHour(null);
                  }}
                />
              </div>

              {/* Hours */}
              <div>
                <label className="block font-medium mb-1">Khung giờ</label>
                <div className="grid grid-cols-3 gap-2">
                  {HOURS.map(hour => {
                    const slots = availableSlots?.[hour] ?? 3;
                    const disabled = !selectedDate || slots <= 0;
                    return (
                      <button
                        key={hour}
                        disabled={disabled}
                        onClick={() => setSelectedHour(hour)}
                        className={`rounded border py-1 text-sm ${
                          selectedHour === hour
                            ? 'bg-blue-500 text-white'
                            : disabled
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'hover:bg-blue-50'
                        }`}
                      >
                        {hour}:00
                        <div className="text-xs">
                          {disabled ? 'Hết chỗ' : `Còn ${slots} slot`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={handleNext}
                disabled={!selectedDate || !selectedHour}
                className="px-5 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 disabled:opacity-50"
              >
                Tiếp theo
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Thông tin khách hàng & thú cưng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thông tin đặt */}
              <div>
                <p><strong>Dịch vụ:</strong> {serviceName}</p>
                <p><strong>Ngày:</strong> {selectedDate}</p>
                <p><strong>Giờ:</strong> {selectedHour}:00</p>
                <p><strong>Khách:</strong> {user?.name || 'Ẩn danh'}</p>
                <p><strong>Số điện thoại:</strong> {user?.phone || 'Ẩn danh'}</p>
              </div>

              {/* Thú cưng */}
              <div>
                <label className="block font-medium mb-2">Thông tin thú cưng</label>
                <div className="mb-2">
                  <label>
                    <input
                      type="radio"
                      value="existing"
                      checked={petOption === 'existing'}
                      onChange={() => setPetOption('existing')}
                    />{' '}
                    Chọn có sẵn
                  </label>
                  <label className="ml-4">
                    <input
                      type="radio"
                      value="new"
                      checked={petOption === 'new'}
                      onChange={() => setPetOption('new')}
                    />{' '}
                    Nhập mới
                  </label>
                </div>

                {petOption === 'existing' ? (
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={selectedPet}
                    onChange={(e) => setSelectedPet(e.target.value)}
                  >
                    <option value="">-- Chọn thú cưng --</option>
                    {fakePetList.map((pet, i) => (
                      <option key={i} value={pet}>{pet}</option>
                    ))}
                  </select>
                ) : (
                  <>
                    <input
                      className="w-full border rounded px-3 py-2 mb-1"
                      placeholder="Tên thú cưng"
                      value={newPet.name}
                      onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                    />
                    <input
                      className="w-full border rounded px-3 py-2 mb-1"
                      placeholder="Loại"
                      value={newPet.type}
                      onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
                    />
                    <input
                      className="w-full border rounded px-3 py-2 mb-1"
                      placeholder="Cân nặng"
                      value={newPet.weight}
                      onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button onClick={handleBack} className="px-4 py-2 bg-gray-200 rounded">Quay lại</button>
              <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded">Tiếp theo</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="text-lg font-semibold mb-4">Xác nhận & hoàn tất</h3>
            <p>✅ Mọi thông tin đã hợp lệ. Nhấn “Xác nhận” để đặt lịch.</p>
            <div className="mt-6 flex justify-between">
              <button onClick={handleBack} className="px-4 py-2 bg-gray-200 rounded">Quay lại</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700">
                Xác nhận đặt lịch
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
