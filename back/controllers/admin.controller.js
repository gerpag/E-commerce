const AdminServices = require("../services/admin.services");

const getUsers = async (req, res) => {
  try {
    const users = await AdminServices.getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await AdminServices.getUserById(id);
    res.json(user);
  } catch (error) {
    console.log(error);
    if (error.message === "User not found") {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const eliminar = await AdminServices.deleteUserById(id);
    res.status(202).json("deleted");
  } catch (error) {
    console.log(error);
    if (error.message === "User not found") {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
};
