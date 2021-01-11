// STATEFUL This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. This component also renders an "Update Course" button for navigating to the "Update Course" screen.
import React from 'react';

const CourseDetail = (props) => (
  <div>
    <div class="header">
      <div class="bounds">
        <h1 class="header--logo">Courses</h1>
        <nav><span>Welcome Joe Smith!</span><a class="signout" href="index.html">Sign Out</a></nav>
      </div>
    </div>
    <hr />
    <div>
      <div class="actions--bar">
        <div class="bounds">
          <div class="grid-100">
            <span>
              <a class="button" href="update-course.html">Update Course</a>
              <a class="button" href="/">Delete Course</a>
            </span>
            <a class="button button-secondary" href="index.html">Return to List</a>
          </div>
        </div>
      </div>

      <div class="bounds course--detail">
        <div class="grid-66">
          <div class="course--header">
            <h4 class="course--label">Course</h4>
            <h3 class="course--title">{props.title}</h3>
            <p>By {props.user}</p>
          </div>
          <div class="course--description">
            {props.description}
          </div>
        </div>
        <div class="grid-25 grid-right">
          <div class="course--stats">
            <ul class="course--stats--list">
              <li class="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{props.estimatedTime}</h3>
              </li>
              <li class="course--stats--list--item">
                <h4>Materials Needed</h4>

                <ul>
                  <li>{props.materialsNeeded}</li>
                  <li>1/2 x 3/4 inch parting strip</li>
                  <li>1 x 2 common pine</li>
                  <li>1 x 4 common pine</li>
                  <li>1 x 10 common pine</li>
                  <li>1/4 inch thick lauan plywood</li>
                  <li>Finishing Nails</li>
                  <li>Sandpaper</li>
                  <li>Wood Glue</li>
                  <li>Wood Filler</li>
                  <li>Minwax Oil Based Polyurethane</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
);

export default CourseDetail;
