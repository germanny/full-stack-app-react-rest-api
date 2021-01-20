import React, { useState, useEffect } from "react";
import Data from "../../Data";

export const Context = React.createContext();

export const Provider = (props) => {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    const data = new Data();
    console.log(data);

    data
      .searchCourseApi(`/courses/${courseId}`)
      .then((response) => setCourseData(response.data))
      .catch((error) => console.log("Error fetching and parsing data", error))
      .finally(() => setIsLoading(false));
  }, [courseId]);

  return (
    <Context.Provider
      value={{
        courseData,
        isLoading,
        actions: {
          setCourseId,
        },
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
