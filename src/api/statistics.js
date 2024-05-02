import axios from "axios";
import axiosClient from "./index";

const getTop5Customer = async () => {
    return axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + `/v1/statistics/top-5-customer`,
      // params: params,
    })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        throw err;
      });
};


const getTop5Employee = async () => {
    return axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + `/v1/statistics/top-5-employee`,
      // params: params,
    })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        throw err;
      });
};


const getTop10Product = async () => {
    return axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + `/v1/statistics/top-10-product`,
      // params: params,
    })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        throw err;
      });
};


const getRevenueByWeek = async () => {
    return axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + `/v1/statistics/revenue-by-week`,
      // params: params,
    })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        throw err;
      });
};


const getRevenueByMonth = async () => {
    return axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + `/v1/statistics/revenue-by-month`,
      // params: params,
    })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        throw err;
      });
};





export {getTop5Customer , getTop5Employee , getTop10Product, getRevenueByWeek , getRevenueByMonth};
  