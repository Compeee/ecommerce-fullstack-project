import React from "react";

import UserTableItems from "./UserTableItems";

import "./UserTable.css";
const UserTable = () => {
  return (
    <table className="people-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <UserTableItems></UserTableItems>
    </table>
  );
};

export default UserTable;
