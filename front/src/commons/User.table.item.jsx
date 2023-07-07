import { useState } from "react";
import { toast } from "react-toastify";
import userApi from "../api/modules/user.api";

const UserItem = ({ user, handleUserId }) => {
  const [isAdmin, setIsAdmin] = useState(user.is_admin);
  const [isSuperAdmin, setIsSuperAdmin] = useState(user.is_super_admin);

  const handleChange = async (userId, role) => {
    let isChecked;
    let rolUser;

    if (role === "admin") {
      isChecked = !user.is_admin;
      rolUser = "admin";
      setIsAdmin(!user.is_admin);
    } else if (role === "super_admin") {
      isChecked = !user.is_super_admin;
      rolUser = "super_admin";
      setIsSuperAdmin(!user.is_super_admin);
    }

    const { response, err } = await userApi.registerAdmin({
      userId,
      isChecked,
      rolUser,
    });
    if (response) {
      toast.success("Le deseo lo mejor!");
    }

    if (err) toast.error(err.message);
  };

  return (
    <tr className="text-center">
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.firstname}</td>
      <td>{user.lastname}</td>
      <td>
        <input
          type="checkbox"
          name="admin"
          checked={isAdmin}
          onChange={() => handleChange(user.id, "admin")}
        />
      </td>
      <td>
        <input
          type="checkbox"
          name="super_admin"
          checked={isSuperAdmin}
          onChange={() => handleChange(user.id, "super_admin")}
        />
      </td>
      <td>
        <button
          onClick={() => handleUserId(user.id)}
          className="hover:bg-red-600"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default UserItem;
