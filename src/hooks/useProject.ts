import useData from "./useData";
export interface Contestant {
  _id: string;
  categories: string[];
  name: string;
}

type ServerExpectedContestantData = Pick<Contestant, "name" | "categories">;

const useProject = (projectId: string) =>
  useData<Contestant, ServerExpectedContestantData>("/contestant" + projectId);
export default useProject;
