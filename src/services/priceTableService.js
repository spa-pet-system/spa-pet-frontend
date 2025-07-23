import axios from "~/api/axiosClient"

export const getPriceTable = async () => {
  try {
    const res = await axios.get('/price-table');
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
