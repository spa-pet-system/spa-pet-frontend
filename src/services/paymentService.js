import axiosClient from '../api/axiosClient'

// Create payment link for QR payment
export const createPaymentLink = async (paymentData) => {
  try {
    const response = await axiosClient.post('/payment/create-payment-link', paymentData)
    return response.data
  } catch (error) {
    console.error('Create payment link error:', error)
    throw error
  }
}

// Get payment status
export const getPaymentStatus = async (orderCode) => {
  try {
    const response = await axiosClient.get(`/payment/status/${orderCode}`)
    return response.data
  } catch (error) {
    console.error('Get payment status error:', error)
    throw error
  }
}

// Create order (for COD payment)
export const createOrder = async (orderData) => {
  try {
    const response = await axiosClient.post('/orders', orderData)
    return response.data
  } catch (error) {
    console.error('Create order error:', error)
    throw error
  }
}

// Get user orders
export const getUserOrders = async (params = {}) => {
  try {
    const response = await axiosClient.get('/orders', { params })
    return response.data
  } catch (error) {
    console.error('Get user orders error:', error)
    throw error
  }
}

// Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await axiosClient.get(`/orders/${orderId}`)
    return response.data
  } catch (error) {
    console.error('Get order by ID error:', error)
    throw error
  }
}

// Confirm payment success
export const confirmPayment = async (orderCode) => {
  try {
    const response = await axiosClient.post('/payment/confirm-payment', {
      orderCode
    })
    return response.data
  } catch (error) {
    console.error('Confirm payment error:', error)
    throw error
  }
}

const paymentService = {
  createPaymentLink,
  getPaymentStatus,
  createOrder,
  getUserOrders,
  getOrderById,
  confirmPayment,
}

export default paymentService