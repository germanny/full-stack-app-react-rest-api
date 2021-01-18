// STATEFUL This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route. This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.
import React, { useEffect, useState } from "react";
import FormCourse from "./FormCourse";
import { Context } from "./Context";

const UpdateCourse = (props) => {
  const {
    params: { id },
  } = props.match;
  console.log("updateCourse id: ", id);
  console.log(props);

  const { courseData, actions } = React.useContext(Context);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    actions.setCourseId(id);
  });

  const userName = !courseData.User
    ? ""
    : `${courseData.User.firstName} ${courseData.User.lastName}`;

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
    props.history.push(`/courses/${id}`);
  };

  return (
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
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
                      value={courseData.title}
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
                    >
                      {courseData.description}
                    </textarea>
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
                          value={courseData.estimatedTime}
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
                        >
                          {courseData.materialsNeeded}
                        </textarea>
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
