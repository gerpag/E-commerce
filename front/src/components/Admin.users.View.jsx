import React, { useEffect, useState } from "react";
import axios from "axios";
import UserItem from "../commons/User.table.item";

function AdminUsersView() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();

  const handleUserId=(id)=>{
    setUserId(id)

  }

  const loadUsers = () => {
    axios
      .get("http://localhost:3000/api/v1/admin/users")
      .then((res) => setUsers(res.data))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (userId > 0) {
      axios
        .delete(`http://localhost:3000/api/v1/admin/users/${userId}`)
        .then(() => loadUsers())
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId]);

  return (
    <div className="flex items-center flex-col h-screen">
      <div className="flex items-center flex-col bg-blue-100 mt-5 p-5">
        <h2 className="text-3xl mt-4">LISTADO DE USUARIOS:</h2>
        <table className="mt-5">
          <thead>
            <tr className="border-collapse">
              <th className="ml-10 px-10">id</th>
              <th className="ml-10 px-10">Usuario</th>
              <th className="ml-10 px-10">Nombre</th>
              <th className="ml-10 px-10">Apellido</th>
            </tr>
          </thead>
          <tbody className="px-10 h-min mt-5 bg-blue-100">
            {users.map((user, i) => {
              return <UserItem user={user} handleUserId={handleUserId} key={i} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsersView;



/*<div
                key={user.id}
                className="flex justify-between text-2xl px-10 mt-2 mb-2  "
              >
                <li className="mr-6">{`${user.firstname} ${user.lastname}`}</li>
                <button
                  onClick={() => setUserId(user.id)}
                  className="hover:bg-red-600"
                >
                  ❌
                </button>
              </div>
              */