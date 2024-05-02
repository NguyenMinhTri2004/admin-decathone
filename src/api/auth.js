import axios from "axios";
import Cookies from "js-cookie";

const login = async (data) => {
  return axios({
    method: "POST",
    url: process.env.NEXT_PUBLIC_API_URL + "/v1/user/signin",
    data: data,
  })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

const CreateAccountAdmin = async (data) => {
  const token = Cookies.get("accessToken");
  return axios({
    method: "POST",
    url: process.env.NEXT_PUBLIC_API_URL + `/v1/user/admin/employee?role=${data?.roles}`,
    data: {
      username: data?.username,
      password: data?.password,
      email: data?.email,
      firstName: data?.firstName,
      lastName: data?.lastName,
      phoneNumber: data?.phoneNumber,
      gender: data?.gender,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};




const UpdateAccountAdmin = async (data) => {
  const token = Cookies.get("accessToken");
  return axios({
    method: "PATCH",
    url: process.env.NEXT_PUBLIC_API_URL + `/v1/user/admin/employee/role/${data?.id}?role=${data?.roles}`,
    data: {
      username: data?.username,
      password: data?.password,
      email: data?.email,
      firstName: data?.firstName,
      lastName: data?.lastName,
      phoneNumber: data?.phoneNumber,
      gender: data?.gender,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

const register = async (data) => {
  return axios({
    method: "POST",
    url: process.env.REACT_APP_PUBLIC_API_URL + "/v1/user/signup",
    data: data,
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const getProfile = async () => {
  const token = Cookies.get("accessToken");
  console.log('Token' , token)
  return axios({
    method: "GET",
    url: process.env.NEXT_PUBLIC_API_URL + "/v1/user/profile",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

const getAllRole = async () => {
  return axios({
    method: "GET",
    url: process.env.NEXT_PUBLIC_API_URL + "/v1/user/role",
  })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

const getUserByPage = async (page) => {
  const token = Cookies.get("accessToken");

  return axios({
    method: "GET",
    url: process.env.NEXT_PUBLIC_API_URL + `/v1/user/all/${page}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      return res?.data;
    })
    .catch((err) => {
      throw err;
    });
};

const updateProfile = async (data) => {
  const token = Cookies.get("accessToken");

  return axios({
    method: "PATCH",
    url: process.env.REACT_APP_PUBLIC_API_URL + `/v1/user/${data.id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
    },
  })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

const updatePassword = async (data) => {
  return axios({
    method: "POST",
    url: process.env.REACT_APP_PUBLIC_API_URL + `/v1/user/password/email`,
    data: data,
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      throw err;
    });
};


const deleteAccount = async (id) => {
  return axios({
    method: "DELETE",
    url: process.env.NEXT_PUBLIC_API_URL + `/v1/user/${id}`,
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      throw err;
    });
};


export {
  login,
  register,
  getProfile,
  updateProfile,
  updatePassword,
  getUserByPage,
  getAllRole,
  CreateAccountAdmin,
  deleteAccount,
  UpdateAccountAdmin
};
