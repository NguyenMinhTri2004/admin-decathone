import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = () => {
  const token = Cookies.get("token_decathlon_clone");

  const axiosOptions = axios.create({
    baseURL: process.env.PUBLIC_API_URL,
    headers: {
      "content-type": "application/json",
      "X-Ecomos-Access-Token": token,
    },
  });
  return axiosOptions;
};
export default axiosClient;
