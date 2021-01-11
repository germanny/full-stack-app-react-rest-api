import React, { useState, useEffect } from 'react'
import Data from '../../Data';

export const Context = React.createContext();

export const Provider = (props) => {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = new Data();
    console.log(data);

    data.searchCourseApi('/courses')
      .then(response => setCourseData(response.data))
      .catch(error => console.log('Error fetching and parsing data', error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Context.Provider value={{
      courseData,
      isLoading
    }}>
      { props.children}
    </Context.Provider>
  );
}
