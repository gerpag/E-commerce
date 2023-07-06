import privateClient from "../client/private.client";

const categoryEndpoints = {
  list: "category/all",
  add: "category/add",
  update: ({ categoryId }) => `category/${categoryId}`,
  remove: ({ categoryId }) => `category/${categoryId}`,
};

const categoryApi = {
  add: async ({ name }) => {
    try {
      const response = await privateClient.post(categoryEndpoints.add, {
        name,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  update: async ({ categoryId, name }) => {
    try {
      const response = await privateClient.put(
        categoryEndpoints.update({ categoryId }),
        {
          name,
        }
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  remove: async ({ categoryId }) => {
    try {
      const response = await privateClient.delete(
        categoryEndpoints.remove({ categoryId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getList: async () => {
    try {
      const response = await privateClient.get(categoryEndpoints.list);

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default categoryApi;
