// STATEFUL This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. This component also renders an "Update Course" button for navigating to the "Update Course" screen.
import React, { useEffect, useContext } from "react";
import { NavLink, Route } from "react-router-dom";
import { Context } from "../Context";
import { authContext } from "../Context/auth";
import UpdateCourse from "./UpdateCourse";

const CourseDetail = ({ match }) => {
  const {
    params: { id },
  } = match;

  console.log("course detail id: ", id);

  const { courseData, actions } = useContext(Context);
  const { authUser } = useContext(authContext);

  console.log(authUser.id);
  console.log(courseData.userId);

  const isAuthUser = authUser.id === courseData.userId;

  useEffect(() => {
    actions.getCourseById(id);
  });

  const userName = !courseData.User
    ? ""
    : `${courseData.User.firstName} ${courseData.User.lastName}`;

  return (
    <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            {isAuthUser ? (
              <span>
                <NavLink className="button" to={`/courses/${id}/update`}>
                  Update Course
                </NavLink>
                <a className="button" href="/">
                  Delete Course
                </a>
              </span>
            ) : (
              ""
            )}
            <NavLink className="button button-secondary" to="/">
              Return to List
            </NavLink>
          </div>
        </div>
      </div>

      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            Course Detail
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{courseData.title}</h3>
            <p>By {userName}</p>
          </div>
          <div className="course--description">{courseData.description}</div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{courseData.estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>

                <ul>
                  <li>{courseData.materialsNeeded}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Route
        path={`/courses/${id}/update`}
        render={() => <UpdateCourse id={id} />}
      />
    </div>
  );
};

export default CourseDetail;
