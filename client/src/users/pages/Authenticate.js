import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Button from "../../shared/components/button/Button";
import Card from "../../shared/components/card/Card";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import "./Authenticate.css";

const Authenticate = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          process.env.REACT_APP_BACKEND + "/users/login",
          {
            email: email,
            password: password,
          },
          { "Content-Type": "application/json" }
        );

        auth.login(
          response.data.userId,
          response.data.token,
          response.data.role
        );
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    } else {
      try {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (name.length > 0 && password.length > 6 && regex.test(email)) {
          setIsLoading(true);
          const response = await axios.post(
            process.env.REACT_APP_BACKEND + "/users/signup",
            {
              name: name,
              email: email,
              password: password,
            },
            { "Content-Type": "application/json" }
          );
          auth.login(
            response.data.userId,
            response.data.token,
            response.data.role
          );
        }

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }
  };

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <React.Fragment>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? "Login required" : "Signup"}</h2>
        <hr />
        <form onSubmit={onSubmitHandler}>
          {!isLoginMode && (
            <input
              className="authenticate-input"
              placeholder="Name"
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          )}
          <input
            className="authenticate-input"
            placeholder="Email"
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="authenticate-input"
            placeholder="Password"
            type="password"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div></div>
          <Button type="submit">{isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? "Signup" : "Login"} instead?
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Authenticate;
