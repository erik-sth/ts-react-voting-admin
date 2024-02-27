import { useCallback, useEffect, useMemo, useState } from "react";
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

  const [storeVotedPerCategory, setStoreVotedPerCategorie] = useState<
    { categories: string[]; contestant: Contestant }[]
  >([]);
  const [currentVoted, setCurrentVoted] = useState<Contestant>();
  const [display, setDisplay] = useState<"voting" | "banned" | "voted">(
    "voting"
  );
  const saveStoredContestantWhenVoted = useCallback(
    (contestantStored: Contestant) => {
      setStoreVotedPerCategorie((prevStore) => [
        ...prevStore.filter((s) =>
          arraysHaveSameValues(selectedCategories, s.categories)
        ),
        { categories: selectedCategories, contestant: contestantStored },
      ]);
    },
    [selectedCategories]
  );
  //find contestant if already voted for displaying contestant
  useEffect(() => {
    // Check if already stored
    const voted = storeVotedPerCategory.find((s) =>
      arraysHaveSameValues(s.categories, selectedCategories)
    );

    if (voted) {
      setCurrentVoted(voted?.contestant);
      setDisplay("voted");
      return;
    }

    // If not stored then check local storage
    const name = manageLocalStorage.getVoted(selectedCategories);

    if (!name) {
      setCurrentVoted(undefined);
      setDisplay("voting"); // Ensure to set display to "voting" here
      return;
    }

    // If name found, check for the contestant
    const contestantStored = contestants.find((r) => r.name === name);
    setCurrentVoted(contestantStored);

    if (contestantStored) saveStoredContestantWhenVoted(contestantStored);

    setDisplay("voting");
  }, [
    manageLocalStorage,
    contestants,
    selectedCategories,
    saveStoredContestantWhenVoted,
    storeVotedPerCategory,
  ]);
  function vote() {
    if (!currentSelected)
      throw Error("Voting button enabled before selecting contestant.");
    apiClient
      .post(`/vote/${projectId}/${currentSelected?._id}`)
      .then(() => {
        manageLocalStorage.setVoted(
          currentSelected?.name || "",
          selectedCategories
        );

        //saveStoredContestantWhenVoted(currentSelected);
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
