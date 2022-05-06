import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Users from "./users/pages/Users";
import Authenticate from "./users/pages/Authenticate";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { Table } from "./users/components/Table/Table";
import { UserProfile } from "./users/components/UserProfile";
const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [role, setRole] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, role, expirationDate) => {
    setToken(token);
    setRole(role);
    setUserId(uid);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        role: role,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    //prevent a render loop
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.role,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;
  if (token && role === "admin") {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/admin" exact>
          <Table />
        </Route>
        <Route path="/profile" exact>
          <UserProfile />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (token && role === "user") {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/profile" exact>
          <UserProfile />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/auth">
          <Authenticate />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        role: role,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
