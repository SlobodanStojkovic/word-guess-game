import React from "react";

const ServerError = (props) => {
  return (
    <div data-test="component-server-error" className="alert alert-danger">
      There was an error retrieving the secret word. Please try again later.
    </div>
  );
};

export default ServerError;
