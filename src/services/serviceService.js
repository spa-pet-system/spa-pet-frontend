import axios from "~/api/axiosClient"

export const getServices = async () => {
  try {
    const res = await axios.get('/customer/service');
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const getServiceBySlug = async (slug) => {
  try {
    const res = await axios.get(`/customer/service/${slug}`)
    console.log(`api get: service/${slug}`, res.data);
    return res.data
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const getActiveServiceCount = async () => {
  const res = await axios.get('/admin/services/count');
  return res.data.totalActiveServices;
};