import { ServerExpectedProjectData } from "../../hooks/useProjects";

interface Props {
  newProject: ServerExpectedProjectData;
  updateProject: (project: ServerExpectedProjectData) => void;
}
const ProjectTimeForm = ({ newProject, updateProject }: Props) => {
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProject({
      ...newProject,
      config: {
        ...newProject.config,
        votingStartDayAndTime: new Date(e.target.value),
      },
    });
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProject({
      ...newProject,
      config: {
        ...newProject.config,
        votingEndDayAndTime: new Date(e.target.value),
      },
    });
  };
  const handleTimeCheckboxChange = () => {
    updateProject({
      ...newProject,
      config: {
        ...newProject.config,
        useTime: !newProject.config.useTime,
      },
    });
  };
  return (
    <div>
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
    </div>
  );
};

export default ProjectTimeForm;
