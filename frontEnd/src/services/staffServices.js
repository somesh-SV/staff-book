import axios from "axios";
const URL = process.env.React_App_BaseUrl;

export const PostStaff = async (recData) => {
  try {
    const response = await axios.post(`${URL}/staff`, recData);
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

export const GetStaff = async () => {
  try {
    const response = await axios.get(`${URL}/staff`);
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

export const GetSingleStaff = async (_id) => {
  try {
    const response = await axios.get(`${URL}/staff/${_id}`);
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

export const UpdateStaff = async (id, recData) => {
  try {
    const response = await axios.put(`${URL}/staff/${id}`, recData);
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

export const DeleteStaff = async (_id) => {
  try {
    const response = await axios.delete(`${URL}/staff/${_id}`);
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

export const FilterStaff = async (searchQuery) => {
  try {
    const response = await axios.get(`${URL}/filterStaff?query=${searchQuery}`);
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
