import axios from "~/api/axiosClient";

export const getSlotStatus = async (serviceId, date) => {
  const res = await axios.get(`/customer/appointment/count-by-slot?serviceId=${serviceId}&date=${date}`);
  return res.data;
};

export const createNewAppointment = async (appointment) => {
  const res = await axios.post('/customer/appointment', appointment)
  return res.data
}

