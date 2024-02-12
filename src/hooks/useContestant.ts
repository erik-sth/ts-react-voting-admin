import { useEffect, useMemo, useState } from "react";
import apiClient from "../services/api-client";
import { UseLocalStorage } from "./useLocalstorage";
import { useParams } from "react-router-dom";

export interface Contestant {
  _id: string;
  name: string;
  gender: string;
}

const useContestant = () => {
  const { projectId } = useParams();
  const [renderData, setRenderData] = useState<Contestant[]>([]);
  const [femaleContestant, setFemaleContestant] = useState<Contestant[]>([]);
  const [maleContestant, setMaleContestant] = useState<Contestant[]>([]);

  const [selectedGender, setSelectedGender] = useState<"m" | "f">("m");
  const [selectedMale, setSelectMale] = useState<Contestant | null>(null);
  const [selectedFemale, setSelectFemale] = useState<Contestant | null>(null);

  const [votedMale, setVotedMale] = useState(false);
  const [votedFemale, setVotedFemale] = useState(false);

  const manageLocalStorage = useMemo(
    () => new UseLocalStorage(projectId as string),
    [projectId]
  );

  useEffect(() => {
    const { maleId, maleVotedName } = manageLocalStorage.getMaleVote();
    const { femaleId, femaleVotedName } = manageLocalStorage.getFemaleVote();
    if (maleId && maleVotedName) {
      setSelectMale({ gender: "m", name: maleVotedName, _id: maleId });
      setVotedMale(true);
    }
    if (femaleId && femaleVotedName) {
      setSelectFemale({ gender: "f", name: femaleVotedName, _id: femaleId });
      setVotedFemale(true);
    }
  }, [manageLocalStorage]);

  useEffect(() => {
    if (selectedGender === "m" && !votedMale) setRenderData(maleContestant);
    else if (selectedGender === "f" && !votedFemale)
      setRenderData(femaleContestant);
    else setRenderData([]);
  }, [
    selectedGender,
    femaleContestant,
    maleContestant,
    votedFemale,
    votedMale,
  ]);

  useEffect(() => {
    if (projectId) {
      apiClient
        .get(`/contestant/${projectId}`)
        .then((response) => {
          const contestants = response.data.results;
          const female = contestants.filter(
            (contestant: Contestant) => contestant.gender === "f"
          );
          const male = contestants.filter(
            (contestant: Contestant) => contestant.gender === "m"
          );
          setFemaleContestant(female);
          setMaleContestant(male);
        })
        .catch((error) => {
          console.error("Error fetching contestants:", error);
        });
    }
  }, [projectId]);

  function selectContestant(contestant: Contestant) {
    if (selectedGender === "m") setSelectMale(contestant);
    else setSelectFemale(contestant);
  }

  function vote() {
    if (selectedGender === "m" && selectedMale) {
      const { _id, name } = selectedMale;
      apiClient
        .post(`/vote/${projectId}/${_id}`)
        .then(() => {
          setVotedMale(true);
          manageLocalStorage.setMaleVoted(_id, name);
        })
        .catch((err) => console.log(err));
    }
    if (selectedGender === "f" && selectedFemale) {
      const { _id, name } = selectedFemale;
      apiClient
        .post(`/vote/${projectId}/${_id}`)
        .then(() => {
          setVotedFemale(true);
          manageLocalStorage.setFemaleVoted(_id, name);
        })
        .catch((err) => console.log(err));
    }
  }

  return {
    renderData,
    selectedGender,
    selectedFemale,
    selectedMale,
    votedMale,
    votedFemale,
    setSelectedGender,
    selectContestant,
    vote,
  };
};

export default useContestant;
