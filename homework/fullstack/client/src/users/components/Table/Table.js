import React from "react";
import { TableItems } from "./TableItems";
import "./Table.css";
export const Table = () => {
  return (
    <table className="people-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <TableItems></TableItems>
    </table>
  );
};
