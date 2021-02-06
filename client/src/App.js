import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CourseDetail from "./Components/CourseDetail";
import Courses from "./Components/Courses";
import CreateCourse from "./Components/CreateCourse";
import Error from "./Components/Error";
import Header from "./Components/Header";
import NotFound from "./Components/NotFound";
import PrivateRoute from "./Components/PrivateRoute";
import UpdateCourse from "./Components/UpdateCourse";
import UserSignIn from "./Components/UserSignIn";
import UserSignOut from "./Components/UserSignOut";
import UserSignUp from "./Components/UserSignUp";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Header />
          <hr />

          <Switch>
            <Route exact path="/" component={Courses} />
            <PrivateRoute path="/courses/create" component={CreateCourse} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
            <Route path="/courses/:id" component={CourseDetail} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUp} />
            <Route path="/signout" component={UserSignOut} />
            <Route path="/error" component={Error} />
            <Route path="/notfound" component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
