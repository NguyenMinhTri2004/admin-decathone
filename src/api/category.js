import axios from "axios";
import axiosClient from "./index";

const addCategory = async (data) => {
  return axios({
    method: "POST",
    url: process.env.REACT_APP_PUBLIC_API_URL + "/v1/category",
    data: data,
    // params: params,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const getCategories = async () => {
  return axios({
    method: "GET",
    url: process.env.NEXT_PUBLIC_API_URL + "/v1/category",
    // params: params,
  })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      throw err;
    });
};

const getCategorybyId = async (id) => {
  return axios({
    method: "GET",
    url: process.env.REACT_APP_PUBLIC_API_URL + `/v1/category/${id}`,
    // params: params,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const getCategorybyName = async (name) => {
  return axios({
    method: "GET",
    url: process.env.REACT_APP_PUBLIC_API_URL + `/v1/category/name/${name}`,
    // params: params,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const updateCategory = async (id, data) => {
  return axios({
    method: "PATCH",
    url: process.env.REACT_APP_PUBLIC_API_URL + `/v1/category/${id}`,
    // params: params,
    data: data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export { getCategories, addCategory, getCategorybyId, getCategorybyName, updateCategory };
