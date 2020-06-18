import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import NoProjects from "./NoProjects";
import Loading from "../layout/Loading";
import ProjectItem from "./ProjectItem";

// Redux
import { connect } from "react-redux";
import { getAllProjects } from "../../redux/actions/projects";

const Dashboard = ({ getAllProjects, project: { projects, loading } }) => {
  useEffect(() => {
    getAllProjects();
  }, [getAllProjects]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h1 className="m2">My Projects</h1>
          <hr />
          <div className="projects">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectItem key={project.id} project={project}></ProjectItem>
              ))
            ) : (
              <NoProjects />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getAllProjects })(Dashboard);
