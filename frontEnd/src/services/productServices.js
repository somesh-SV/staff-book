import axios from "axios";
const URL = process.env.React_App_BaseUrl;

export const PostProduct = async (recData) => {
  try {
    console.log("recData : ", recData);
    const response = await axios.post(`${URL}/product`, recData);
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

export const GetProduct = async () => {
  try {
    const response = await axios.get(`${URL}/product`);
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

export const GetSingleProduct = async (_id) => {
  try {
    const response = await axios.get(`${URL}/product/${_id}`);
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

export const UpdateProduct = async (id, recData) => {
  try {
    const response = await axios.put(`${URL}/product/${id}`, recData);
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

export const DeleteProduct = async (_id) => {
  try {
    const response = await axios.delete(`${URL}/product/${_id}`);
    const res = response.data;
    if (res.error) {
      console.log(res.error);
    } else {
      return res;
    }
  } catch (error) {
    console.error(error);
  }
};

export const FilterProduct = async (searchQuery) => {
  try {
    const response = await axios.get(
      `${URL}/filterProduct?query=${searchQuery}`
    );
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

export const ClearProduct = async (recData) => {
  try {
    const response = await axios.put(`${URL}/clearStock`, recData);
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
