import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import "./UserProfile.css";
import Button from "../../shared/components/button/Button";
const UserProfile = () => {
  const auth = useContext(AuthContext);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    headers: { Authorization: "Bearer " + auth.token },
  });

  const updatePerson = (pid) => {
    authAxios.patch(`/users/${pid}`, {
      name: name,
      email: email,
      password: password,
    });
    history.push("/");
  };

  const getPersonData = async (pid) => {
    const result = await axios.get(
      process.env.REACT_APP_BACKEND + `/users/${pid}`
    );
    setName(result.name);
    setEmail(result.email);
    setPassword(result.password);
  };

  const updateHandler = async (pid) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (name.length > 0 && password.length > 6 && regex.test(email)) {
      updatePerson(pid);
    }
  };

  const deleteHandler = async (id) => {
    const result = await authAxios.delete(`/users/${id}`);
    if (result) {
      auth.logout();
    }
  };

  useEffect(() => {
    getPersonData();
  }, []);

  return (
    <div className="userBackground">
      <div className="userContainer">
        <div className="title">
          <h1>Edit info</h1>
        </div>
        <div className="body">
          <label>Name</label>
          <input
            className="input"
            placeholder="Enter new name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label>Email</label>
          <input
            className="input"
            placeholder="Enter new email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Password</label>
          <input
            className="input"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="footer">
          <Button
            submit
            onClick={() => {
              updateHandler(auth.userId);
            }}
          >
            Confirm edit
          </Button>
          <Button danger onClick={() => deleteHandler(auth.userId)}>
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
