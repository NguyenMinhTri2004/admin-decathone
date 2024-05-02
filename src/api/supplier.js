import axios from "axios";
import axiosClient from "./index";

const getSupplierByPage = async (page) => {
    return axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + `/v1/supplier/all/${page}`,
      // params: params,
    })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        throw err;
      });
};


const createSupplier = async (data) => {
    return axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_URL + `/v1/supplier`,
      data : data
    })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        throw err;
      });
};



const updateSupplier = async (id, data) => {
    return axios({
      method: "PATCH",
      url: process.env.NEXT_PUBLIC_API_URL + `/v1/supplier/${id}`,
      data : data
    })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        throw err;
      });
};


const deleteSupplier = async (id) => {
    return axios({
      method: "DELETE",
      url: process.env.NEXT_PUBLIC_API_URL + `/v1/supplier/${id}`,
    })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        throw err;
      });
};



export {getSupplierByPage, createSupplier, updateSupplier, deleteSupplier};
  