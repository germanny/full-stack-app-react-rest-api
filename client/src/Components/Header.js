// STATELESS Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user) or the user's name and a button for signing out (if there's an authenticated user).
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  // const { courseData } = React.useContext(Context);
  const authUser = ''; // context.authenticatedUser;

  return (
    <div className="header">
      <div className="bounds">
        <NavLink exact to="/"><h1 className="header--logo">Courses</h1></NavLink>
        <nav>
          {authUser ?
            <React.Fragment>
              <span>Welcome, {authUser.name}!</span>
              <Link to="/signout">Sign Out</Link>
            </React.Fragment>
            :
            <React.Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </React.Fragment>
          }
        </nav>
      </div>
    </div>
  );
}
export default Header;
