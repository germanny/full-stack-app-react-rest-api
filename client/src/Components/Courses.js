// STATEFUL This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. Each course needs to link to its respective "Course Detail" screen. This component also renders a link to the "Create Course" screen.
import React from 'react';
import { Context } from './Context';
import Course from './Course';
import NoCourses from './NoCourses';

const Courses = () => {
  const { courseData } = React.useContext(Context);

  let courses;
  if (courseData.length) {
    courses = courseData.map(course => <Course
      key={course.id.toString()}
      id={course.id}
      title={course.title}
      description={course.description}
      estimatedTime={course.estimatedTime}
      materialsNeeded={course.materialsNeeded}
      user={`${course.User.firstName} ${course.User.lastName}`}
    />);
  } else {
    courses = <NoCourses />
  }

  return (
    <div className="bounds">
      {courses}
    </div>
  );
}

export default Courses;
