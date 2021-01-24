import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import UserData from "../Data/userData";

export const Context = React.createContext();

export const Provider = (props) => {
  const [authUser, setAuthUser] = useState({});


  // USER DATA
  const userData = new UserData();

  // Set user state
  const handleAuthUser = (user) => {
    setAuthUser(() => {
      // check if user passed in is not null, and return user value
      if (user !== null) return user;

      // if user === null, check if userCookie is not null and return as user value
      const userCookie = Cookies.getJSON("authenticatedUser");
      if (userCookie !== null) return userCookie;

      // Everything failed, user not auth'd; return null
      return null;
    });
  };

  const signIn = async (emailAddress, password) => {
    const user = await userData
      .getUser(emailAddress, password)
      .then((data) => data.data); // from userData.js

    if (user !== null) {
      handleAuthUser(user);

      // Set a login cookie
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }

    return user;
  };

  const signOut = () => {
    handleAuthUser(null);

    // Remove login cookie
    Cookies.remove("authenticatedUser");
  };

  return (
    <Context.Provider
      value={{
        authUser,
        userData,
        actions: {
          handleAuthUser,
          signIn,
          signOut,
        },
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
