import React from 'react';
import { Context } from './Components/Context';
import Courses from "./Components/Courses";

function App() {
  const { isLoading } = React.useContext(Context);

  return (
    <div className="App">
      <div>
        <div className="header">
          <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="sign-in.html">Sign In</a></nav>
          </div>
        </div>
        <hr />

        {isLoading
          ? <p>Loading...</p>
          : <Courses />
        }

        <div className="grid-33">
          <a className="course--module course--add--module" href="create-course.html">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
                New Course
              </h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
