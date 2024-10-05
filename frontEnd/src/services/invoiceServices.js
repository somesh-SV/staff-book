import axios from "axios";
const URL = process.env.React_App_BaseUrl;

export const createInvoice = async (recData) => {
  try {
    const response = await axios.post(`${URL}/createInvoice`, recData);
    const res = response.data;
    console.log(res);
    if (res.error) {
      console.log(res.error);
      return null;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getInvoiceById = async (_id) => {
  try {
    const response = await axios.get(`${URL}/getInvoice/${_id}`);
    const res = response.data;
    console.log(res);
    if (res.error) {
      console.log(res.error);
      return null;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
