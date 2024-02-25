import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { useParams } from "react-router-dom";

export interface AdminContestant {
  _id: string;
  name: string;
  categories: string[];
  countedVotes: number;
  projectId: string;
}
export type ServerExpectContestant = Pick<
  AdminContestant,
  "categories" | "name"
>;
const useContestantAdmin = () => {
  const { projectId } = useParams();
  const [renderData, setRenderData] = useState<AdminContestant[]>([]);

  useEffect(() => {
    if (projectId) {
      apiClient
        .get(`/contestant/admin/${projectId}`)
        .then((response) => {
          setRenderData(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching contestants:", error);
        });
    }
  }, [projectId]);

  function createContestant(contestant: ServerExpectContestant) {
    apiClient.post(`/contestant/${projectId}`, contestant);
  }
  function deleteContestant(contestantId: string) {
    apiClient.delete(`/contestant/${projectId}/${contestantId}`);
  }

  return {
    renderData,
    createContestant,
    deleteContestant,
  };
};

export default useContestantAdmin;
