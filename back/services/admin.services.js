const Users = require("../models/Users");

class AdminServices {
  static async getUsers() {
    try {
      const users = await Users.findAll();
      return users;
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  static async getUserById(userId) {
    try {
      const user = await Users.findByPk(userId);
      if (user) {
        return user;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.log(error);
      if (error.message === "User not found") {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  static async deleteUserById(userId) {
    try {
      const user = await Users.findByPk(userId);
      if (user) {
        return await Users.destroy({ where: { id: userId } });
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = AdminServices;
