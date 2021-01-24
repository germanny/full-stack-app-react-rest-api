import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CourseData from "../Data/courseData";
import UserData from "../Data/userData";

export const Context = React.createContext();

export const Provider = (props) => {
  const [courseData, getCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseId, getCourseById] = useState("");
  const [authUser, setAuthUser] = useState({});

  // COURSE DATA
  const data = new CourseData();

  useEffect(() => {
    const data = new CourseData();

    data
      .courseApi(`/courses/${courseId}`)
      .then((response) => getCourseData(response.data))
      .catch((error) => console.log("Error fetching and parsing data", error))
      .finally(() => setIsLoading(false));
  }, [courseId]);

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
        courseData,
        data,
        isLoading,
        authUser,
        userData,
        actions: {
          getCourseById,
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
