import axios from "axios";

export const fetchCategories = async (token) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    const { data } = await axios.post("/api/cat/allcategories", "", {
      headers,
    });
    return data.categories;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
