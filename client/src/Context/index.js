import React, { useState } from "react";
import Cookies from "js-cookie";
import UserData from "../Data/userData";

export const authContext = React.createContext();

export const ProvideAuth = (props) => {
  const [authUser, setAuthUser] = useState(
    Cookies.getJSON("authenticatedUser") || null
  );

  // USER DATA
  const userData = new UserData();

  const signIn = async (emailAddress, password) => {
    const user = await userData.getUser(emailAddress, password);

    if (user !== null) {
      user.cred = btoa(password);
      setAuthUser(user);

      // Set a login cookie
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }

    return user;
  };

  const signOut = () => {
    setAuthUser(null);

    // Remove login cookie
    Cookies.remove("authenticatedUser");
  };

  return (
    <authContext.Provider
      value={{
        authUser,
        userData,
        authActions: {
          signIn,
          signOut,
        },
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
