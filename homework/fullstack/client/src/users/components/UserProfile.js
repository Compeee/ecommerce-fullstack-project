import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import "./UserProfile.css";
export const UserProfile = () => {
  const auth = useContext(AuthContext);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const updatePerson = (pid) => {
    axios.patch(
      `http://localhost:5000/api/users/${pid}`,
      {
        name: name,
        email: email,
        password: password,
      },
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    );
    history.push("/");
  };

  const getPersonData = async (pid) => {
    const result = await axios.get(`http://localhost:5000/api/users/${pid}`);
    setName(result.name);
    setEmail(result.email);
    setPassword(result.password);
  };

  const deleteHandler = async (id) => {
    const result = await axios.delete(`http://localhost:5000/api/users/${id}`);
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
          <h1>Edit</h1>
        </div>
        <div className="body">
          <label>Name</label>
          <input
            className="input"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label>Email</label>
          <input
            className="input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Password</label>
          <input
            className="input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              updatePerson(auth.userId);
            }}
          >
            Confirm edit
          </button>
          <button
            className="btn btn-del"
            onClick={() => deleteHandler(auth.userId)}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};
