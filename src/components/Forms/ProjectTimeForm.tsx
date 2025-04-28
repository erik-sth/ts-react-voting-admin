import { Project } from '../../hooks/useProjects';

interface Props {
	newProject: Project;
	updateProject: (project: Project) => void;
}
const formatDateForInput = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const ProjectTimeForm = ({ newProject, updateProject }: Props) => {
	const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputDate = new Date(e.target.value);
		updateProject({
			...newProject,
			config: {
				...newProject.config,
				votingStartDayAndTime: inputDate,
			},
		});
	};

	const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputDate = new Date(e.target.value);
		updateProject({
			...newProject,
			config: {
				...newProject.config,
				votingEndDayAndTime: inputDate,
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
				<label htmlFor='useTimeSpan'>Use Time Span:</label>
				<input
					type='checkbox'
					id='useTimeSpan'
					checked={newProject.config.useTime}
					onChange={handleTimeCheckboxChange}
				/>
			</div>
			{newProject.config.useTime && (
				<div>
					<div>
						<label htmlFor='startTime'>Start Time:</label>
						<input
							type='datetime-local'
							id='startTime'
							value={formatDateForInput(
								newProject.config.votingStartDayAndTime
							)}
							onChange={handleStartTimeChange}
						/>
					</div>
					<div>
						<label htmlFor='endTime'>End Time:</label>
						<input
							type='datetime-local'
							id='endTime'
							value={formatDateForInput(
								newProject.config.votingEndDayAndTime
							)}
							onChange={handleEndTimeChange}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProjectTimeForm;
