
import axios from "axios";
import axiosClient from "./index";

const getProducts = async () => {
  return axios({
    method: "GET",
    url: process.env.NEXT_PUBLIC_API_URL + '/v1/product',
    // params: params,
  })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      throw err;
    });
};


const getProductById = async (id) => {
  return axios({
    method: "GET",
    url: process.env.REACT_APP_PUBLIC_API_URL + `/v1/product/${id}`,
    // params: params,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const getProductByName = async (name) => {
  return axios({
    method: "GET",
    url: process.env.REACT_APP_PUBLIC_API_URL + `/v1/product/name/${name}`,
    // params: params,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};


const getProductByPage = async (page) => {
  return axios({
    method: "GET",
    url: process.env.NEXT_PUBLIC_API_URL + `/v1/product/admin/${page}`,
    // params: params,
  })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      throw err;
    });
};


const addProductImage = async (id, data) => {
  return axios({
    method: "POST",
    url: process.env.REACT_APP_PUBLIC_API_URL + `/v1/product/image/${id}`,
    data : data
    // params: params,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};


const addProduct = async (data) => {
  return axios({
    method: "POST",
    url: process.env.NEXT_PUBLIC_API_URL + '/v1/product',
    data : data
    // params: params,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};





const updateProduct = async (id,data) => {
  return axios({
    headers: { "Content-Type": "multipart/form-data" },
    method: "PATCH",
    url: process.env.NEXT_PUBLIC_API_URL + `/v1/product/${id}`,
    data : data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};


const deleteProduct = async (id) => {
  return axios({
    method: "DELETE",
    url: process.env.NEXT_PUBLIC_API_URL + `/v1/product/${id}`,
    // data : data
    // params: params,
  })
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      throw err;
    });
};



export { getProducts, getProductById,  getProductByName, addProductImage, addProduct, updateProduct, deleteProduct , getProductByPage};
