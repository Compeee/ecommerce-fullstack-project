import React, { useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../../../shared/context/auth-context";
import { useState, useEffect } from "react";
import "./TableItems.css";

export const TableItems = () => {
  const auth = useContext(AuthContext);

  const [userData, setUserData] = useState([]);

  const getPeople = useCallback(() => {
    axios.get("http://localhost:5000/api/users").then((response) => {
      let users = response.data.users;
      let filtered = users.filter((user) => {
        return user.id !== auth.userId;
      });
      setUserData(filtered);
    });
  }, [auth.userId]);

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`).then((response) => {
      getPeople();
    });
  };

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return (
    <tbody>
      {userData.map((user) => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <button
              className="btn btn-del"
              onClick={() => deleteHandler(user.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
