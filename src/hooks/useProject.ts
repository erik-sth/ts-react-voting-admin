import useData from "./useData";
export interface Contestant {
  _id: string;
  gender: "m" | "f";
  name: string;
}

type ServerExpectedContestantData = Pick<Contestant, "name" | "gender">;

const useProject = (projectId: string) =>
  useData<Contestant, ServerExpectedContestantData>("/contestant" + projectId);
export default useProject;
