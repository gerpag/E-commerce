import axios from "axios";

const baseURL = "http://localhost:3000/api/v1";

const userEndpoints = {
  productAdd: "/product/add",
  productDelete: "/product/",
  productUpdate: "/product/",
};
const productApi = {
  productAdd: async ({ name, price, description, url_image, stock }) => {
    try {
      const response = await axios.post(baseURL + userEndpoints.productAdd, {
        name,
        price,
        description,
        url_image,
        stock,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  productDelete: async (id) => {
    try {
      const response = await axios.delete(
        baseURL + userEndpoints.productDelete + id
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  productUpdate: async (id, { name, price, description, url_image, stock }) => {
    try {
      const response = await axios.put(
        baseURL + userEndpoints.productUpdate + id,
        {
          name,
          price,
          description,
          url_image,
          stock,
        }
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default productApi;
