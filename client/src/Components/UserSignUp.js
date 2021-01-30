// STATEFUL This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
import React, { useContext, useState } from "react";
import Form from "./Form";
import { authContext } from "../Context/auth";

const UserSignUp = (props) => {
  const fields = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    errors: []
  };

  const [ userFields, setUserFields ] = useState(fields);
  const { userData, authActions } = useContext(authContext);

  const {
    firstName,
    lastName,
    emailAddress,
    password,
    confirmPassword,
    errors,
  } = userFields;

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserFields(() => {
      return { ...userFields, [name]: value };
    });
  };

  const handleErrors = (err) => {
    setUserFields(() => {
      return { ...userFields, errors: [err] };
    });

  }

  const signUp = (userFields) => {
    const { from } = props.location.state || {
      from: { pathname: "/" },
    };

    if (password !== confirmPassword) {
      return handleErrors("Sorry, your passwords do not match.");
    }

    userData.createUser(userFields)
      .then(() => {
        authActions
          .signIn(emailAddress, password)
          .then(() => {
            console.log(
              `${emailAddress} is successfully signed up and authenticated!`
            );
            props.history.push(from)
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const submit = () => {
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    };

    signUp(user);
  };

  const cancel = () => {
    props.history.push("/");
  };

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign Up</h1>
        <div>
          <Form
            cancel={cancel}
            errors={errors}
            submit={submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className=""
                    placeholder="First Name"
                    value={firstName}
                    onChange={change}
                  />
                </div>
                <div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className=""
                    placeholder="Last Name"
                    value={lastName}
                    onChange={change}
                  />
                </div>
                <div>
                  <input
                    id="emailAddress"
                    name="emailAddress"
                    type="text"
                    className=""
                    placeholder="Email Address"
                    value={emailAddress}
                    onChange={change}
                  />
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className=""
                    placeholder="Password"
                    value={password}
                    onChange={change}
                  />
                </div>
                <div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className=""
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={change}
                  />
                </div>
              </React.Fragment>
            )}
          />
        </div>
        <p>&nbsp;</p>
        <p>
          Already have a user account? <a href="/signin">Click here</a> to sign
          in!
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
