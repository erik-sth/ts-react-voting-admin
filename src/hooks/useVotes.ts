import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { useParams } from "react-router-dom";

export interface Vote {
  _id: string;
  contestandId: string;
  projectId: string;
  publicIpAddress: string;
  remotePort: string;
  gender: "m" | "F";
}

const useVotes = () => {
  const { projectId } = useParams();
  const [renderData, setRenderData] = useState<Vote[]>([]);

  useEffect(() => {
    if (projectId) {
      apiClient
        .get(`/vote/${projectId}`)
        .then((response) => {
          setRenderData(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching votes:", error);
        });
    }
  }, [projectId]);

  return {
    renderData,
  };
};

export default useVotes;
