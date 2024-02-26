import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../hooks/useProjects";
import apiClient from "../../services/api-client";
import ProjectTimeForm from "./ProjectTimeForm";

interface Props {
  project: Project;
  updateProject: (project: Project) => void;
}

const ProjectSettings = ({ project, updateProject }: Props) => {
  const navigate = useNavigate();
  const [votingOpen, setVotingOpen] = useState(project?.config?.votingEnabled);
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
        <ProjectTimeForm newProject={project} updateProject={updateProject} />

        <button
          disabled={project.config.useTime}
          className={votingOpen ? "open neutral" : "closed neutral"}
          onClick={() => {
            if (votingOpen) {
              apiClient.put(`/project/lock/${project._id}`);
              setVotingOpen(false);
            } else {
              apiClient.put(`/project/unlock/${project._id}`);
              setVotingOpen(true);
            }
          }}
        >
          {votingOpen ? "Lock voting" : "Unlock voting"}
        </button>
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
