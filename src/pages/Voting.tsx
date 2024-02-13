import useContestant from "../hooks/useContestant";
import SelectGender from "../components/SelectGender";
import Voted from "../components/Voted";
import SelectContestant from "../components/SelectContestant";
import "./Voting.css";

const Voting = () => {
  const {
    renderData,
    selectedGender,
    selectedMale,
    selectedFemale,
    votedFemale,
    votedMale,
    vote,
    setSelectedGender,
    selectContestant,
  } = useContestant();

  function renderButton() {
    return (
      (selectedGender === "m" && selectedMale && !votedMale) ||
      (selectedGender === "f" && selectedFemale && !votedFemale)
    );
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
        <SelectGender
          gender={selectedGender}
          setGender={(gender) => setSelectedGender(gender)}
        />
        <SelectContestant
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
};

export default Voting;
