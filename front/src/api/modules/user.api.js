import privateClient from "../client/private.client";

const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
};

const userApi = {
  signin: async ({ username, password }) => {
    try {
      const response = await privateClient.post(userEndpoints.signin, {
        username,
        password,
      });

      return { response };
    } catch (err) {
      console.error("err");
      return { err };
    }
  },
  signup: async ({
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
  }) => {
    try {
      const response = await privateClient.post(userEndpoints.signup, {
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
