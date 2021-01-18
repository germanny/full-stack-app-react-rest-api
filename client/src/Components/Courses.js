// STATEFUL This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. Each course needs to link to its respective "Course Detail" screen. This component also renders a link to the "Create Course" screen.
import React, { useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import { Context } from "./Context";
import Course from "./Course";
import CreateCourse from "./CreateCourse";
import NoCourses from "./NoCourses";

const Courses = () => {
  const { actions, courseData, isLoading } = React.useContext(Context);

  useEffect(() => {
    actions.setCourseId("");
  });

  let courses;
  if (courseData.length) {
    courses = courseData.map((course) => (
      <Course key={course.id.toString()} id={course.id} title={course.title} />
    ));
  } else {
    courses = <NoCourses />;
  }

  return (
    <div className="bounds">
      {isLoading ? <p>Loading...</p> : courses}

      <div className="grid-33">
        <NavLink
          className="course--module course--add--module"
          to="/courses/create"
        >
          <h3 className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </h3>
        </NavLink>
      </div>

      <Route path="/courses/create" render={() => <CreateCourse />} />
    </div>
  );
};

export default Courses;
