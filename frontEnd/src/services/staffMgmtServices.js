import axios from "axios";
const URL = process.env.React_App_BaseUrl;

export const PostStaffMgmt = async (recData) => {
  try {
    const response = await axios.post(`${URL}/staffMgmt`, recData);
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

export const GetSingleStaffDetails = async (_id) => {
  try {
    const response = await axios.get(`${URL}/staffMgmt/${_id}`);
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

export const UpdateStaffMgmt = async (id, recData) => {
  try {
    const response = await axios.put(`${URL}/staffMgmt/${id}`, recData);
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

export const UpdateBalance = async (id, recData) => {
  try {
    const response = await axios.put(`${URL}/staffBalance/${id}`, recData);
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

export const DeleteStaffMgmt = async (_id) => {
  try {
    const response = await axios.delete(`${URL}/staffMgmt/${_id}`);
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

export const FilterStaffMgmt = async (_id, searchQuery) => {
  try {
    const response = await axios.get(
      `${URL}/filterStaffMgmt?id=${_id}&query=${searchQuery}`
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
