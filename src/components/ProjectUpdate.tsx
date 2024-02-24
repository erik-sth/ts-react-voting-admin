import { Project } from "../hooks/useProjects";
import apiClient from "../services/api-client";
interface Props {
  project: Project;
}
const ProjectUpdate = ({ project }: Props) => {
  return (
    <div>
      <button
        onClick={async () =>
          await apiClient.put(`/project/reset/${project._id}`)
        }
      >
        Reset
      </button>
      <button
        onClick={async () => await apiClient.delete(`/project/${project._id}`)}
      >
        Delete
      </button>
    </div>
  );
};

export default ProjectUpdate;
