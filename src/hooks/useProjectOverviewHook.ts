import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import socket from "../services/io-client";

import { useParams } from "react-router-dom";
import { Vote } from "./useVotes";
import { Project } from "./useProjects";

export interface AdminContestant {
  _id: string;
  name: string;
  categories: string[];
  voteCount: number;
  duplicateVoteCount: number;
  projectId: string;
}

export type ServerExpectContestant = Pick<
  AdminContestant,
  "categories" | "name"
>;

const useProjectOverviewHook = () => {
  const { projectId } = useParams();
  const [votes, setVotes] = useState<Vote[]>([]);
  const [project, setProject] = useState<Project>();
  const [contestants, setContestants] = useState<AdminContestant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(true); // New state for connection status

  useEffect(() => {
    if (!projectId) return;

    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/project/${projectId}`);
        setVotes(response.data.votes);
        setProject(response.data.project);
        setContestants(response.data.contestants);
        setConnected(true); // Set connected to true on successful fetch
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Error fetching project. Please try again later.");
        setConnected(false); // Set connected to false on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  useEffect(() => {
    const handleVote = (data: { contestant: AdminContestant; vote: Vote }) => {
      const indexToUpdate = contestants.findIndex(
        (c) => c._id === data.contestant._id
      );

      const updatedContestants = [...contestants];

      updatedContestants[indexToUpdate] = data.contestant;

      setContestants(updatedContestants);
      setVotes([...votes, data.vote]);
    };
    const handleProject = (data: Project) => {
      setProject(data);
    };
    socket.emit("join", { projectId });
    socket.on("vote", handleVote);
    socket.on("project", handleProject);

    return () => {
      socket.off("vote", handleVote);
    };
  }, [projectId, contestants, votes, project]);

  function createContestant(contestant: ServerExpectContestant) {
    const prevContestants = [...contestants];
    setContestants([...contestants, contestant as AdminContestant]);
    apiClient
      .post(`/contestant/${projectId}`, contestant)
      .catch(() => setContestants(prevContestants));
  }
  function deleteContestant(contestantId: string) {
    const prevContestants = [...contestants];
    setContestants([...contestants.filter((c) => c._id !== contestantId)]);
    apiClient
      .delete(`/contestant/${projectId}/${contestantId}`)
      .catch(() => setContestants(prevContestants));
  }

  const retryConnection = () => {
    setLoading(true);
    setError(null);
    setConnected(true);
  };

  return {
    createContestant,
    deleteContestant,
    votes,
    loading,
    error,
    contestants,
    project,
    connected,
    retryConnection,
  };
};

export default useProjectOverviewHook;
