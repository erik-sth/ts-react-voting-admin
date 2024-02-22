import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import apiClient from "../../services/api-client";
import { arraysHaveSameValues } from "../../utils/array";
import { LocalStorageManager } from "./LocalStorageManager";

export interface Contestant {
  _id: string;
  name: string;
  categories: string[];
}

const useContestVoting = (
  selectedCategories: string[],
  contestants: Contestant[],
  currentSelected: Contestant | undefined
) => {
  const { projectId } = useParams();

  const manageLocalStorage = useMemo(
    () => new LocalStorageManager(projectId as string),
    [projectId]
  );

  const [storeVotedPerCategorie, setStoreVotedPerCategorie] = useState<
    { categories: string[]; contestant: Contestant }[]
  >([]);
  const [currentVoted, setCurrentVoted] = useState<Contestant>();
  const [display, setDisplay] = useState<"voting" | "banned" | "voted">(
    "voting"
  );

  //find contestant if already voted for displaying contestant
  useEffect(() => {
    const name = manageLocalStorage.getVoted(selectedCategories);
    if (name) {
      const contestantStored = contestants.find((r) => r.name === name);
      setCurrentVoted(contestantStored);
      if (contestantStored)
        setStoreVotedPerCategorie([
          ...storeVotedPerCategorie.filter((s) =>
            arraysHaveSameValues(selectedCategories, s.categories)
          ),
          { categories: selectedCategories, contestant: contestantStored },
        ]);
    } else setCurrentVoted(undefined);
  }, [
    manageLocalStorage,
    contestants,
    selectedCategories,
    storeVotedPerCategorie,
  ]);

  useEffect(() => {
    const voted = storeVotedPerCategorie.find((s) =>
      arraysHaveSameValues(s.categories, selectedCategories)
    );
    setDisplay(voted ? "voted" : "voting");
  }, [selectedCategories, storeVotedPerCategorie, setStoreVotedPerCategorie]);

  function vote() {
    apiClient
      .post(`/vote/${projectId}/${currentSelected?._id}`)
      .then(() => {
        manageLocalStorage.setVoted(
          currentSelected?.name || "",
          selectedCategories
        );

        setStoreVotedPerCategorie([
          ...storeVotedPerCategorie.filter((s) =>
            arraysHaveSameValues(selectedCategories, s.categories)
          ),
          {
            categories: selectedCategories,
            contestant: currentSelected || ({} as Contestant),
          },
        ]);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 403) setDisplay("banned");
      });
  }

  return {
    vote,
    display,
    currentVoted,
  };
};

export default useContestVoting;
