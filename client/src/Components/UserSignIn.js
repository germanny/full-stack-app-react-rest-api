// STATEFUL This component provides the "Sign In" screen by rendering a form that allows a user to sign using their existing account information. The component also renders a "Sign In" button that when clicked signs in the user and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
import React, { useContext, useState } from "react";
import Form from "./Form";
import { authContext } from "../Context/auth";

const UserSignIn = (props) => {
  const fields = {
    emailAddress: "",
    password: "",
  };

  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState(fields);
  const { authActions } = useContext(authContext);

  const { emailAddress, password } = user;

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser(() => {
      return { ...user, [name]: value };
    });
  };

  const submit = () => {
    const { from } = props.location.state || {
      from: { pathname: "/" },
    };

    authActions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors({ errors: ["Sign in was unsuccessful"] });
          return { errors };
        } else {
          props.history.push(from);
          console.log(`Success! ${emailAddress} is now signed in.`);
        }
      })
      .catch((err) => {
        console.log(err);
        props.history.push("/error");
      });
  };

  const cancel = () => {
    props.history.push("/");
  };

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <Form
            cancel={cancel}
            errors={errors}
            submit={submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
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
              </React.Fragment>
            )}
          />
        </div>
        <p>&nbsp;</p>
        <p>
          Don't have a user account? <a href="/signup">Click here</a> to sign
          up!
        </p>
      </div>
    </div>
  );
};

export default UserSignIn;
