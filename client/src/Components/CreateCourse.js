// STATEFUL This component provides the "Create Course" screen by rendering a form that allows a user to create a new course. The component also renders a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
import React, { useState } from "react";
import FormCourse from "./FormCourse";

const CreateCourse = (props) => {
  const [errors, setErrors] = useState([]);

  const change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  const submit = () => {
    console.log("course created, sort of");
    // const { context } = props;
    // const { from } = props.location.state || {
    //   from: { pathname: "/" },
    // };
    //const { username, password } = this.state;

    // context.actions
    //   .signIn(username, password)
    //   .then((user) => {
    //     if (user === null) {
    //       return { errors: ["Sign in was unsuccessful"] };
    //     } else {
    //       props.history.push(from);
    //       console.log(`Success! ${username} is now signed in.`);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     props.history.push("/error");
    //   });
  };

  const cancel = () => {
    props.history.push("/");
  };

  return (
    <div className="bounds course--detail">
      <h1>Create Course</h1>
      <div>
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              <li>Please provide a value for "Title"</li>
              <li>Please provide a value for "Description"</li>
            </ul>
          </div>
        </div>
        <FormCourse
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
                      value=""
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
                          value=""
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
