import React from 'react';
import Data from '../../Data';

export const Context = React.createContext();

export const Provider = (props) => {
  const data = new Data();

  const getCourseList = () => {
    const courses = data.listCourses(); // from Data.js

    if (courses !== null) {
      // this.setState(() => {
      //   return {
      //     authenticatedUser: user,
      //   }
      // });

      // // Set a login cookie
      // Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }

    return courses;
  }

  return (
    <Context.Provider value={{
      data,
      actions: {
        getCourseList
      }
    }}>
      { props.children}
    </Context.Provider>
  );
}
