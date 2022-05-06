import React, { useContext, useState, useCallback, useEffect } from "react";
import axios from "axios";
import "./UserTableItems.css";
import { AuthContext } from "../../../shared/context/auth-context";
import Button from "../../../shared/components/button/Button";
const UserTableItems = () => {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    headers: { Authorization: "Bearer " + auth.token },
  });

  const getPeople = useCallback(() => {
    axios.get(process.env.REACT_APP_BACKEND + "/users").then((response) => {
      let users = response.data.users;
      setUserData(users);
    });
  }, [auth.userId]);

  useEffect(() => {
    getPeople();
  }, [refresh]);

  const deleteHandler = (id) => {
    authAxios.delete(`/users/${id}`).then(() => setRefresh((old) => old + 1));
  };

  return (
    <tbody>
      {userData.map((user) => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            {auth.userId != user.id && (
              <Button danger onClick={() => deleteHandler(user.id)}>
                Delete
              </Button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default UserTableItems;
