import axios from "~/api/axiosClient";

export const getPetsByCustomer = async () => {
  try {
    const res = await axios.get('/customer/pets')
    return res.data
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}       

export const createPet = async (petData) => {
  try {
    const res = await axios.post('/customer/pets', petData)
    return res.data
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

