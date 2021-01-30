import React, { useState, useEffect } from "react";
import CourseData from "../Data/courseData";

export const Context = React.createContext();

export const Provider = (props) => {
  const [courseData, getCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseId, getCourseById] = useState("");

  // COURSE DATA
  const data = new CourseData();

  useEffect(() => {
    const data = new CourseData();

    data
      .courseApi(`/courses/${courseId}`)
      .then((response) => getCourseData(response.data))
      .catch((err) => console.log("Error fetching and parsing data", err))
      .finally(() => setIsLoading(false));
  }, [courseId]);

  return (
    <Context.Provider
      value={{
        courseData,
        data,
        isLoading,
        actions: {
          getCourseById,
        },
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
