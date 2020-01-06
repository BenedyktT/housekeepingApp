import { connect } from "react-redux";

import React from "react";

function Alert({ alerts }) {
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`container alert-${alert.type}`}>
        {alert.msg}
      </div>
    ))
  );
}
const mapStateToProps = state => ({
  alerts: state.alertReducer
});

export default connect(mapStateToProps)(Alert);
