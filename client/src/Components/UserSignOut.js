// STATELESS This component is a bit of an oddball as it doesn't render any visual elements. Instead, it signs out the authenticated user and redirects the user to the default route (i.e. the list of courses).
import React, { useContext, useEffect } from "react"; // , { useEffect }
import { authContext } from "../Context/auth";
import { Redirect } from 'react-router-dom';

const UserSignOut = () => {
  const { authActions } = useContext(authContext);

  useEffect(() => authActions.signOut());

  return <Redirect to="/" />;
};

export default UserSignOut;
