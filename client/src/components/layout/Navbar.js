import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../style/main.css";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";

export const Navbar = ({ auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          My Projects
        </Link>
      </li>
      <li className="nav-item">
        <a onClick={logout} className="nav-link" href="#!">
          Log Out
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Log In
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <div className="navbar-logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#toggledMenu"
          aria-controls="#toggledMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="toggledMenu">
          {!loading && (
            <ul className="navbar-nav ml-auto">
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
