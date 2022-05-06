import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const users = await axios.get("http://localhost:5000/api/users/");
        setIsLoading(false);
        setUserData(users.data);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []); //We can add it as dependency because useCallback will prevent a loop

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && userData && <UsersList items={userData.users} />}
    </React.Fragment>
  );
};

export default Users;
