import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Items from "./items/pages/Items";
import Authenticate from "./users/pages/Authenticate";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import UserTable from "./users/components/Table/UserTable";
import ItemTable from "./items/components/Table/ItemTable";
import UserProfile from "./users/components/UserProfile";
import ItemReviews from "./items/pages/ItemReviews";
let logoutTimer;
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
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

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
          <Items />
        </Route>
        <Route path="/user-list">
          <UserTable />
        </Route>
        <Route path="/item-list">
          <ItemTable />
        </Route>
        <Route path="/profile/:userid">
          <UserProfile />
        </Route>
        <Route path="/reviews/:itemid">
          <ItemReviews />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (token && role === "user") {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Items />
        </Route>
        <Route path="/profile/:userid">
          <UserProfile />
        </Route>
        <Route path="/reviews/:itemid">
          <ItemReviews />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Items />
        </Route>
        <Route path="/auth">
          <Authenticate />
        </Route>
        <Route path="/reviews/:itemid">
          <ItemReviews />
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
