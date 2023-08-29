import axios from "axios";
import { toast } from "react-hot-toast";

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post("/api/users/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getUserProfile = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/users/profile", config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateProfile = async ({ token, userData }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      "/api/users/updateProfile",
      userData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateProfilePicture = async ({ token, formData }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      "/api/users/updateProfilePicture",
      formData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getUsers = async (
  searchKeyword,
  currentPage,
  limit,
  userState
) => {
  try {
    const url = "/api/users/getusers"; // Replace with your actual URL
    const token = userState.userInfo.token;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const postData = {
      limit: limit,
      page: currentPage,
      searchKeyword: searchKeyword,
    };

    const response = await axios.post(url, postData, { headers });
    if (response.status === 200) {
      const data = {
        users: response.data,
        totalCount: parseInt(response.headers["x-totalcount"]),
        pageSize: parseInt(response.headers["x-pagesize"]),
        totalPageCount: parseInt(response.headers["x-totalpagecount"]),
      };

      return data;
    }
  } catch (error) {
    toast.error("Something went wrong");
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);

    throw new Error(error.message);
  }
};
