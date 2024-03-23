import { useNavigate } from "react-router-dom";
import { Project } from "../../hooks/useProjects";
import apiClient from "../../services/api-client";
import ProjectTimeForm from "./ProjectTimeForm";

interface Props {
  project: Project;
}

const ProjectSettings = ({ project }: Props) => {
  const navigate = useNavigate();
  function getProject() {
    project.config.votingStartDayAndTime = new Date(
      project.config.votingStartDayAndTime
    );
    project.config.votingEndDayAndTime = new Date(
      project.config.votingEndDayAndTime
    );
    return project;
  }
  project = getProject();
  return (
    <div>
      <div>
        <ProjectTimeForm
          newProject={project}
          updateProject={(newProject) => {
            if (newProject.config.useTime != project.config.useTime) {
              if (newProject.config.useTime) {
                apiClient.put(`/project/useTime/${project._id}`);
              } else {
                apiClient.put(`/project/admin/${project._id}`);
              }
            } else {
              apiClient.put(`/project/time/${project._id}`, newProject);
            }
          }}
        />
        {!project.config.useTime && (
          <button
            className={
              project.config.votingEnabled ? "open neutral" : "closed neutral"
            }
            onClick={() => {
              if (project.config.votingEnabled) {
                apiClient.put(`/project/lock/${project._id}`);
              } else {
                apiClient.put(`/project/unlock/${project._id}`);
              }
            }}
          >
            {project.config.votingEnabled ? "Lock voting" : "Unlock voting"}
          </button>
        )}
      </div>
      <div>
        <button
          className="sec"
          onClick={async () =>
            await apiClient.put(`/project/reset/${project._id}`)
          }
        >
          Reset
        </button>
        <button
          className="delete"
          onClick={async () => {
            await apiClient.delete(`/project/${project._id}`);
            navigate("/admin");
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectSettings;
