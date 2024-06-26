import axios from "axios";
const URL = process.env.React_App_BaseUrl;

export const PostCustomer = async (recData) => {
  try {
    const response = await axios.post(`${URL}/customer`, recData);
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

export const GetCustomer = async () => {
  try {
    const response = await axios.get(`${URL}/customer`);
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

export const GetSingleCustomer = async (_id) => {
  try {
    const response = await axios.get(`${URL}/customer/${_id}`);
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

export const UpdateCustomer = async (id, recData) => {
  try {
    const response = await axios.put(`${URL}/customer/${id}`, recData);
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

export const DeleteCustomer = async (_id) => {
  try {
    const response = await axios.delete(`${URL}/customer/${_id}`);
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

export const GetLinkedProducts = async (id, recData) => {
  try {
    const response = await axios.post(`${URL}/customerProudcts/${id}`, recData);
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

export const UpdateLinkedProduct = async (id, recData) => {
  try {
    const response = await axios.put(
      `${URL}/updateLinkedProduct/${id}`,
      recData
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

export const DeleteLinkedProduct = async (id, recData) => {
  try {
    const response = await axios.put(
      `${URL}/deleteLinkedProduct/${id}`,
      recData
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

export const FilterCustomer = async (searchQuery) => {
  try {
    const response = await axios.get(
      `${URL}/filterCustomer?query=${searchQuery}`
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

export const FilterLinkedProduct = async (_id, searchQuery) => {
  try {
    const response = await axios.get(
      `${URL}/filterLinkedProduct?id=${_id}&query=${searchQuery}`
    );
    const res = response.data;

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
