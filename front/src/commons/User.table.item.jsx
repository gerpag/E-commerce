const UserItem = ({ user, handleUserId }) => {
  return (
    <tr className="text-center">
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.firstname}</td>
      <td>{user.lastname}</td>
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
