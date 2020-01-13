import { connect } from "react-redux";

import React from "react";

function Alert({ alerts }) {
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
<<<<<<< HEAD
      <div key={alert.id} className={`container alert-${alert.type}`}>
=======
      <div key={alert.id} className={`container alert alert-${alert.type}`}>
>>>>>>> test
        {alert.msg}
      </div>
    ))
  );
}
const mapStateToProps = state => ({
  alerts: state.alertReducer
});

export default connect(mapStateToProps)(Alert);
