import axiosClient from '../api/axiosClient'

// Get current user's appointment history
export const getMyAppointmentHistory = async () => {
  try {
    const response = await axiosClient.get('/appointments/my-history')
    return response.data
  } catch (error) {
    console.error('Error fetching my appointment history:', error)
    throw error
  }
}

// Get appointment history for a specific user (admin only or own data)
export const getUserAppointmentHistory = async (userId) => {
  try {
    const response = await axiosClient.get(`/appointments/user/${userId}/history`)
    return response.data
  } catch (error) {
    console.error('Error fetching user appointment history:', error)
    throw error
  }
}

// Get all appointments (admin only)
export const getAllAppointments = async () => {
  try {
    const response = await axiosClient.get('/appointments/all')
    return response.data
  } catch (error) {
    console.error('Error fetching all appointments:', error)
    throw error
  }
}

// Get appointment by ID
export const getAppointmentById = async (appointmentId) => {
  try {
    const response = await axiosClient.get(`/appointments/${appointmentId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching appointment:', error)
    throw error
  }
}

const appointmentService = {
  getMyAppointmentHistory,
  getUserAppointmentHistory,
  getAllAppointments,
  getAppointmentById
}

export default appointmentService