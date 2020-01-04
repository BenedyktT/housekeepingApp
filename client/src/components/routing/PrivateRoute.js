import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Privateroute = ({
  component: Component,
  isAuthenticated,
  loading,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default connect(state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  loading: state.authReducer.loading
}))(Privateroute);
