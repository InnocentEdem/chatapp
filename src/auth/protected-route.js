import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const ProtectedRoute = (element) => {
  const Component = withAuthenticationRequired(element);
  return <Component />;
};

export default ProtectedRoute;