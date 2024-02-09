import { useEffect, useState } from "react";
import "./App.css";
import UseContestent, { Contestant } from "./useContestent";
import SwitchGender from "./components/SelectGender";
import Voting from "./components/Voting";
import Voted from "./components/Voted";

function App() {
  const data = new UseContestent();

  const [selectedMale, setSelectMale] = useState<Contestant | null>(null);
  const [selectedFemale, setSelectFemale] = useState<Contestant | null>(null);

  const [selectedGender, setSelectedGender] = useState<"m" | "f">("m");

  const [renderData, setRenderData] = useState<Contestant[]>(
    data.maleContestant
  );

  const [votedMale, setVotedMale] = useState(false);
  const [votedFemale, setVotedFemale] = useState(false);

  useEffect(() => {
    if (selectedGender === "m" && !votedMale)
      setRenderData(data.maleContestant);
    else if (selectedGender === "f" && !votedFemale)
      setRenderData(data.femaleContestant);
    else setRenderData([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGender, votedFemale, votedMale]);

  useEffect(() => {
    const maleId = localStorage.getItem("votedMaleId");
    const maleVotedName = localStorage.getItem("maleVotedName");
    const femaleId = localStorage.getItem("votedFemaleId");
    const femaleVotedName = localStorage.getItem("femaleVotedName");
    if (maleId && maleVotedName) {
      setSelectMale({ gender: "m", name: maleVotedName, _id: maleId });
      setVotedMale(true);
    }
    if (femaleId && femaleVotedName) {
      setSelectFemale({ gender: "f", name: femaleVotedName, _id: femaleId });
      setVotedFemale(true);
    }
  }, []);

  function vote() {
    if (selectedGender === "m" && selectedMale) {
      setVotedMale(true);
      localStorage.setItem("votedMaleId", selectedMale?._id);
      localStorage.setItem("maleVotedName", selectedMale?.name);
      console.log("vote: " + selectedMale);
    }
    if (selectedGender === "f" && selectedFemale) {
      setVotedFemale(true);
      localStorage.setItem("votedFemaleId", selectedFemale?._id);
      localStorage.setItem("femaleVotedName", selectedFemale?.name);
      console.log("vote: " + selectedFemale);
    }
  }

  function renderButton() {
    return (
      (selectedGender === "m" && selectedMale && !votedMale) ||
      (selectedGender === "f" && selectedFemale && !votedFemale)
    );
  }

  function selectContestant(contestant: Contestant) {
    if (selectedGender === "m") setSelectMale(contestant);
    else setSelectFemale(contestant);
  }

  function isSelected(contestantId: string) {
    return (
      (selectedGender === "m" && selectedMale?._id === contestantId) ||
      (selectedGender === "f" && selectedFemale?._id === contestantId)
    );
  }

  return (
    <>
      <button
        onClick={() => {
          localStorage.clear();
        }}
      >
        Reset
      </button>
      <nav className="container">
        <h1>Ballkönig/-in</h1>
      </nav>
      <section className="container">
        <SwitchGender
          gender={selectedGender}
          setGender={(gender) => setSelectedGender(gender)}
        />
        <Voting
          isSelected={isSelected}
          renderData={renderData}
          selectContestant={selectContestant}
        />
        {selectedGender === "m" && votedMale && selectedMale && (
          <Voted name={selectedMale?.name} />
        )}
        {selectedGender === "f" && votedFemale && selectedFemale && (
          <Voted name={selectedFemale.name} />
        )}
      </section>
      <footer className="container">
        {renderButton() && (
          <div>
            <p>Änderung der Wahl nicht möglich.</p>
            <button onClick={vote}>Final Abstimmen</button>
          </div>
        )}
      </footer>
    </>
  );
}

export default App;
