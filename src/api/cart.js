import { Method } from "../utils/constants";
import axios from "axios";
import axiosClient from "./index";
import Cookies from "js-cookie";


const getCart = async () => {
  const token = Cookies.get("accessToken")
  return axios({
    method: "GET",
    url: process.env.REACT_APP_PUBLIC_API_URL + '/v1/cart',
    // params: params,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};



const addCartItem = async (data) => {
  const token = Cookies.get("accessToken")
  return axios({
    method: "POST",
    url: process.env.REACT_APP_PUBLIC_API_URL + '/v1/cart',
    data : data,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    // params: params,
  })
    .then((res) => {
      console.log(res)
      return res;
    })
    .catch((err) => {
      throw err;
    });
};


const updateCartItem = async (data) => {
    const token = Cookies.get("accessToken")
    return axios({
      method: "PATCH",
      url: process.env.REACT_APP_PUBLIC_API_URL + `/v1/cart-detail/quantity`,
      data : data,
      // params: params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
};


const deleteCartItem = async (productId) => {
    const token = Cookies.get("accessToken")
    return axios({
      method: "DELETE",
      url: process.env.REACT_APP_PUBLIC_API_URL + `/v1/cart-detail/${productId}`,
    //   data : data
      // params: params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
};





export { getCart, addCartItem, updateCartItem, deleteCartItem };
