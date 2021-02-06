// STATEFUL This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route. This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.
import React, { useState, useContext } from "react";
import { authContext } from "../Context/auth";
import Form from "./Form";
import useFetch from "../Hooks/useFetch";
import apiUrl from "../config";
import axios from "axios";

const UpdateCourse = (props) => {
  const {
    params: { id },
  } = props.match;

  const { authUser } = useContext(authContext);
  const courseData = useFetch({ path: `/courses/${id}`, extra: "hi" });
  const { response, error } = courseData;
  const course = response ? response.data : {};

  const [errors, setErrors] = useState([]);
  const [fields, setFields] = useState(course);

  const userName = course.User
    ? `${course.User.firstName} ${course.User.lastName}`
    : '';

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFields(() => {
      return { ...fields, [name]: value };
    });
  };

  const submit = () => {
    console.log('begin submit');
    const url = apiUrl + `/courses/${id}`;

    console.log("begin axios");
    axios({
      method: "PUT",
      url,
      data: {
        title: fields.title || course.title,
        description: fields.description || course.description,
        estimatedTime: fields.estimatedTime || course.estimatedTime,
        materialsNeeded: fields.materialsNeeded || course.materialsNeeded,
        userId: course.userId,
      },
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      auth: {
        username: authUser.emailAddress,
        password: atob(authUser.cred),
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const cancel = () => {
    props.history.push(`/courses/${id}`);
  };

  return (
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="input-title course--title--input"
                      placeholder="Course title..."
                      value={fields.title || course.title}
                      onChange={change}
                    />
                  </div>
                  <p>By {userName}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      className=""
                      placeholder="Course description..."
                      value={fields.description || course.description}
                      onChange={change}
                    />
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          className="course--time--input"
                          placeholder="Hours"
                          value={
                            fields.estimatedTime || course.estimatedTime
                          }
                          onChange={change}
                        />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          className=""
                          placeholder="List materials..."
                          value={
                            fields.materialsNeeded || course.materialsNeeded
                          }
                          onChange={change}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    </div>
  );
};

export default UpdateCourse;
