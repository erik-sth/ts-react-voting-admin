import useData from "./useData";
export interface Project {
  _id: string;
  name: string;
  owner: string;
  categories: {
    option1: CatergorieOption;
    option2: CatergorieOption;
    title: string;
  }[];
  config: {
    useTime: boolean;
    votingStartDayAndTime: Date;
    votingEndDayAndTime: Date;
    votingEnabled: boolean;
    limitVotesToOnePerIp: boolean;
  };
}
export interface CatergorieOption {
  key: string;
  name: string;
  color: "pink" | "blue" | "white";
}

export type ServerExpectedProjectData = Pick<
  Project,
  "name" | "config" | "categories"
>;

const useProjects = (projectId?: string) =>
  useData<Project, ServerExpectedProjectData>("/project" + (projectId || ""));
export default useProjects;
