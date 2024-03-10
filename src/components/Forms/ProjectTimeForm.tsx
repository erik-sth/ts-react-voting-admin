import { Project } from "../../hooks/useProjects";

interface Props {
  newProject: Project;
  updateProject: (project: Project) => void;
}
const formatDateForInput = (date: Date): string => {
  const isoString = date.toISOString();
  return isoString.slice(0, 16);
};

const ProjectTimeForm = ({ newProject, updateProject }: Props) => {
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = new Date(e.target.value);
    const utcDate = new Date(
      Date.UTC(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate(),
        inputDate.getHours(),
        inputDate.getMinutes()
      )
    );
    updateProject({
      ...newProject,
      config: {
        ...newProject.config,
        votingStartDayAndTime: utcDate,
      },
    });
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = new Date(e.target.value);
    const utcDate = new Date(
      Date.UTC(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate(),
        inputDate.getHours(),
        inputDate.getMinutes()
      )
    );
    updateProject({
      ...newProject,
      config: {
        ...newProject.config,
        votingEndDayAndTime: utcDate,
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
              value={formatDateForInput(
                newProject.config.votingStartDayAndTime
              )}
              onChange={handleStartTimeChange}
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time:</label>
            <input
              type="datetime-local"
              id="endTime"
              value={formatDateForInput(newProject.config.votingEndDayAndTime)}
              onChange={handleEndTimeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTimeForm;
