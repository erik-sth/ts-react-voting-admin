import React, { useState } from "react";
import { ServerExpectedProjectData } from "../hooks/useProjects";

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

  const handleTimeCheckboxChange = () => {
    setNewProject({
      ...newProject,
      config: {
        ...newProject.config,
        useTime: !newProject.config.useTime,
      },
    });
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

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProject({
      ...newProject,
      config: {
        ...newProject.config,
        votingStartDayAndTime: new Date(e.target.value),
      },
    });
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProject({
      ...newProject,
      config: {
        ...newProject.config,
        votingEndDayAndTime: new Date(e.target.value),
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
        <ul></ul>
        <div>
          <label htmlFor="title">title</label>
          <input type="text" id="title" />
          <div></div>
          <label htmlFor="a">option a</label>
          <input type="text" id="a" />
          <label htmlFor="b">option b</label>
          <input type="text" id="b" />
          <button>add</button>
        </div>
        <div>
          <label htmlFor="votesLimitedPerIp">Limit votes per IP:</label>
          <input
            type="checkbox"
            id="votesLimitedPerIp"
            checked={newProject.config.limitVotesToOnePerIp}
            onChange={handleLimitVotesCheckboxChange}
          />
        </div>
        <div>
          <label htmlFor="useTimeSpan">Use Time Span:</label>
          <input
            type="checkbox"
            id="useTimeSpan"
            checked={newProject.config.useTime}
            onChange={handleTimeCheckboxChange}
          />
        </div>
        {newProject.config.useTime && (
          <div>
            <div>
              <label htmlFor="startTime">Start Time:</label>
              <input
                type="datetime-local"
                id="startTime"
                value={newProject.config.votingStartDayAndTime
                  .toISOString()
                  .slice(0, 16)}
                onChange={handleStartTimeChange}
              />
            </div>
            <div>
              <label htmlFor="endTime">End Time:</label>
              <input
                type="datetime-local"
                id="endTime"
                value={newProject.config.votingEndDayAndTime
                  .toISOString()
                  .slice(0, 16)}
                onChange={handleEndTimeChange}
              />
            </div>
          </div>
        )}
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
