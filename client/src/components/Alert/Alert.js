import React, { Fragment } from "react";
import PropTypes from "prop-types";

// MaterialUI Components
import SnackbarContent from "../Snackbar/SnackbarContent";
import Clearfix from "../Clearfix/Clearfix";

// MaterialUI Icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";

// Redux
import { connect } from "react-redux";

let icon = "";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id}>
      <SnackbarContent
        message={<span>{alert.msg}</span>}
        close
        color={alert.alertType}
      />
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
