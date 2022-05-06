import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext); //Linking our AuthContext from app
  return (
    <ul className="nav-links">
      <NavLink to="/" exact>
        PRODUCTS
      </NavLink>
      {auth.role === "admin" && auth.isLoggedIn && (
        <li>
          <NavLink to="/user-list">USER LIST</NavLink>
        </li>
      )}
      {auth.role === "admin" && auth.isLoggedIn && (
        <li>
          <NavLink to="/item-list">ITEM LIST</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/profile/${auth.userId}`}>PROFILE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
