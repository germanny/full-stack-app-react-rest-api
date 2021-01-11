import React from 'react';

const Course = (props) => (
  <div className="grid-33">
    {/** TODO: Make this a LINK component */}
    <a className="course--module course--link" href={`${props.id}`}>
      <h4 className="course--label">Course</h4>
      <h3 className="course--title">{props.title}</h3>
    </a>
  </div>
);

export default Course;
