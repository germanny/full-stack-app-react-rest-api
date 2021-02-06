// STATEFUL This component provides the "Create Course" screen by rendering a form that allows a user to create a new course. The component also renders a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
import React, { useContext, useState } from "react";
import Form from "./Form";
import { authContext } from "../Context";
import apiUrl from "../config";
import axios from "axios";

const CreateCourse = (props) => {
  const fields = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  };

  const [courseFields, setCourseFields] = useState(fields);
  const { authUser } = useContext(authContext);

  const {
    title,
    description,
    estimatedTime,
    materialsNeeded,
    errors,
  } = courseFields;

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCourseFields(() => {
      return { ...courseFields, [name]: value };
    });
  };

  const handleErrors = (err) => {
    setCourseFields(() => {
      return { ...courseFields, errors: [err] };
    });
  };

  const addCourse = async (courseFields) => {
    if (!title) {
      return handleErrors('Please provide a value for "Title".');
    }

    if (!description) {
      return handleErrors('Please provide a value for "Description".');
    }

    return await axios({
      url: apiUrl + "/courses",
      method: "POST",
      data: courseFields,
      auth: {
        username: authUser.emailAddress,
        password: atob(authUser.cred),
      },
    })
      .then((response) => {
        console.log("create course response", response);
        if (response.status === 201) {
          return response;
        } else if (response.status === 400) {
          return response.data.errors;
        } else {
          throw new Error();
        }
      })
      .then((response) => {
        console.log("create course 2nd then response", response);
        props.history.push(`/`);
      })
      .catch((err) => console.log("catch: ", err))
      .finally((response) =>
        console.log("create course finally response", response)
      );
  };

  const submit = () => {
    const courseFields = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id,
    };

    addCourse(courseFields);
  };

  const cancel = () => {
    props.history.push(`/`);
  };

  return (
    <div className="bounds course--detail">
      <h1>Create Course</h1>
      <div>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Create Course"
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
                      value={title}
                      onChange={change}
                    />
                  </div>
                  <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      className=""
                      placeholder="Course description..."
                      value={description}
                      onChange={change}
                    ></textarea>
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
                          value={estimatedTime}
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
                          value={materialsNeeded}
                          onChange={change}
                        ></textarea>
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
export default CreateCourse;
