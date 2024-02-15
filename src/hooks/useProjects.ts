import useData from "./useData";
export interface Project {
  _id: string;
  name: string;
  owner: string;
  config: {
    useTime: boolean;
    votingStartDayAndTime: Date;
    votingEndDayAndTime: Date;
    votingEnabled: boolean;
    limitVotesToOnePerIp: boolean;
  };
}

export type ServerExpectedProjectData = Pick<Project, "name" | "config">;

const useProjects = (projectId?: string) =>
  useData<Project, ServerExpectedProjectData>("/project" + (projectId || ""));
export default useProjects;
