import React from "react";
import { connect } from "react-redux";
import {
  makeGetProject,
  makeGetProjects
} from "app/containers/project/selector";
import ProjectWrapper from "./Wrapper";

@connect((state, ownProps) => {
  const getProjects = makeGetProjects();
  const getProject = makeGetProject();
  return {
    projects: getProjects(state),
    project: getProject(state, ownProps.params.id)
  };
})
export default class View extends React.PureComponent {
  render() {
    const { project } = this.props;

    return (
      <ProjectWrapper {...this.props}>
        {_.isEmpty(project.groups) && (
          <div className="welcome-message">
            <div className="welcome-message-inner">
              <h2>Welcome to your grid</h2>
              <p>Click the menu above to start plotting your groups.</p>
            </div>
          </div>
        )}
        {_.isEmpty(project.groups) && (
          <p className="grid-tooltip-message">Click to begin</p>
        )}
      </ProjectWrapper>
    );
  }
}
