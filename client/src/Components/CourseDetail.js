// STATEFUL This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. This component also renders an "Update Course" button for navigating to the "Update Course" screen.
import React, { useContext } from "react";
import { NavLink, Route } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { authContext } from "../Context";
import { useHistory } from "react-router-dom";
import UpdateCourse from "./UpdateCourse";
import Error from "./Error";
import apiUrl from "../config";
import axios from "axios";

const CourseDetail = ({ match }) => {
  const {
    params: { id },
  } = match;

  const courseData = useFetch({ path: `/courses/${id}` });
  const { response, error, isLoading } = courseData;
  const { authUser } = useContext(authContext);
  const history = useHistory();

  const course = response ? response.data : {};
  const isAuthUser = authUser ? authUser.id === course.userId : null;

  const userName = !course.User
    ? ""
    : `${course.User.firstName} ${course.User.lastName}`;

  const axiosDelete = (url, options) => {
    return axios.delete(url, options).catch((err) => {
      return err.response;
    });
  };

  const handleDeleteCourse = (e) => {
    e.preventDefault();
    const url = apiUrl + `/courses/${id}`;

    const options = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      auth: {
        username: authUser.emailAddress,
        password: atob(authUser.cred),
      },
    };

    try {
      const response = axiosDelete(url, options).then((res) => {
        return res;
      });

      if (response) {
        setTimeout(() => {
          history.push(`/`);
        }, 150);
      } else {
        history.push("/error");
      }
    } catch (error) {
      if (error.status === 404) {
        history.push("/notfound");
      } else {
        history.push("/error");
      }
    }
  };

  return (
    <div>
      {isLoading ? <p>Loading...</p> : ""}
      {error ? <Error /> : ""}

      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            {isAuthUser ? (
              <span>
                <NavLink className="button" to={`/courses/${id}/update`}>
                  Update Course
                </NavLink>
                <button className="button" onClick={handleDeleteCourse}>
                  Delete Course
                </button>
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
            <h3 className="course--title">{course.title}</h3>
            <p>By {userName}</p>
          </div>
          <div className="course--description">{course.description}</div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{course.estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>

                <ul>
                  <li>{course.materialsNeeded}</li>
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
