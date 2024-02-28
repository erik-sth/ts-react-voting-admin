import React, { useState } from "react";
import { Project, ServerExpectedProjectData } from "../../hooks/useProjects";
import ProjectTimeForm from "./ProjectTimeForm";
import CategoriesForm from "./CategoriesForm";

interface Props {
  create: (project: ServerExpectedProjectData) => void;
}

const ProjectForm: React.FC<Props> = ({ create }: Props) => {
  const [newProject, setNewProject] = useState<ServerExpectedProjectData>({
    name: "",
    categories: [],
    config: {
      useTime: false,
      votingStartDayAndTime: new Date(),
      votingEndDayAndTime: new Date(),
      votingEnabled: true,
      limitVotesToOnePerIp: false,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProject({ ...newProject, name: e.target.value });
  };

  const handleLimitVotesCheckboxChange = () => {
    setNewProject({
      ...newProject,
      config: {
        ...newProject.config,
        limitVotesToOnePerIp: !newProject.config.limitVotesToOnePerIp,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create(newProject);
  };

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectName">Name:</label>
          <input
            type="text"
            id="projectName"
            value={newProject.name}
            onChange={handleInputChange}
          />
        </div>

        <CategoriesForm newProject={newProject} updateProject={setNewProject} />
        <div>
          <label htmlFor="votesLimitedPerIp">Limit votes per IP:</label>
          <input
            type="checkbox"
            id="votesLimitedPerIp"
            checked={newProject.config.limitVotesToOnePerIp}
            onChange={handleLimitVotesCheckboxChange}
          />
        </div>

        <ProjectTimeForm
          newProject={newProject as Project}
          updateProject={setNewProject}
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
