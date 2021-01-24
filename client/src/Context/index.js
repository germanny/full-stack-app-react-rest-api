import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CourseData from "../Data/courseData";
import UserData from "../Data/userData";

export const Context = React.createContext();

export const Provider = (props) => {
  const [courseData, getCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseId, getCourseById] = useState("");
  const [authUser, setAuthUser] = useState(
    Cookies.getJSON("authenticatedUser") || null
  );

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

  const signIn = async (emailAddress, password) => {
    console.log('signIn started');
    const user = await userData // from userData.js
      .getUser(emailAddress, password);
      // .then((response) => {
      //   console.log('context getuser response: ', response);
      //   return response.data;
      // }, (error) => {
      //   console.log(error);
      // })

    console.log('user gotten: ', user);

    if (user !== null) {
      setAuthUser(user);

      // Set a login cookie
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
      console.log('cookie set');
    }

    return user;
  };

  const signOut = () => {
    setAuthUser(null);

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
          signIn,
          signOut,
        },
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
