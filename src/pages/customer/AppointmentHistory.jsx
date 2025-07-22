import React, { useState, useEffect } from 'react'
import { appointmentService } from '../../services'
import { toast } from 'react-toastify'
import MainLayout from '~/layouts/MainLayout'

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAppointmentHistory()
  }, [])

  const fetchAppointmentHistory = async () => {
    try {
      setLoading(true)
      const response = await appointmentService.getMyAppointmentHistory()
      setAppointments(response.appointments || [])
      setError(null)
    } catch (error) {
      console.error('Error fetching appointment history:', error)
      setError('Failed to load appointment history')
      toast.error('Failed to load appointment history')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-orange-100 text-orange-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-[140px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải lịch sử cuộc hẹn...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-[140px]">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Có lỗi xảy ra</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchAppointmentHistory}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8 pt-[140px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử cuộc hẹn</h1>
            <p className="text-gray-600">Xem tất cả các cuộc hẹn dịch vụ của bạn</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-orange-500">{appointments.length}</div>
              <div className="text-sm text-gray-600">Tổng cuộc hẹn</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-yellow-600">
                {appointments.filter(apt => apt.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Đang chờ</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-orange-500">
                {appointments.filter(apt => apt.status === 'confirmed').length}
              </div>
              <div className="text-sm text-gray-600">Đã xác nhận</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-green-600">
                {appointments.filter(apt => apt.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Đã hoàn thành</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-red-600">
                {appointments.filter(apt => apt.status === 'cancelled').length}
              </div>
              <div className="text-sm text-gray-600">Đã hủy</div>
            </div>
          </div>

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có cuộc hẹn nào</h3>
            <p className="text-gray-600 mb-6">Bạn chưa đặt lịch dịch vụ nào. Hãy đặt lịch ngay để chăm sóc thú cưng của bạn!</p>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
              Đặt lịch ngay
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 mr-3">
                          {appointment.service?.name || 'Dịch vụ không xác định'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status === 'pending' && 'Đang chờ'}
                          {appointment.status === 'confirmed' && 'Đã xác nhận'}
                          {appointment.status === 'completed' && 'Đã hoàn thành'}
                          {appointment.status === 'cancelled' && 'Đã hủy'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Ngày hẹn:</span>
                          <div>{formatDate(appointment.date)}</div>
                        </div>
                        <div>
                          <span className="font-medium">Giờ hẹn:</span>
                          <div>{appointment.timeSlot}</div>
                        </div>
                        <div>
                          <span className="font-medium">Thú cưng:</span>
                          <div>{appointment.pet?.name || 'Không xác định'}</div>
                        </div>
                        <div>
                          <span className="font-medium">Thanh toán:</span>
                          <div className={appointment.isPaid ? 'text-green-600' : 'text-red-600'}>
                            {appointment.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Đặt lúc:</span>
                          <div>{formatDateTime(appointment.createdAt)}</div>
                        </div>
                      </div>
                      
                      {appointment.note && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">Ghi chú:</span>
                          <p className="text-gray-600 mt-1">{appointment.note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </MainLayout>
  )
}

export default AppointmentHistory