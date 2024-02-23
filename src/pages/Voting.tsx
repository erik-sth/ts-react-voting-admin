import SelectCategorie from "../components/Voting/SelectCategorie";
import Voted from "../components/Voting/Voted";
import SelectContestant from "../components/Voting/SelectContestant";
import useVoting from "../hooks/voting/VotingPageManager";
import "./Voting.css";

const Voting = () => {
  const {
    display,
    renderData,
    categories,
    vote,
    currentSelected,
    selectedCategories,
    changeSelectedContestantPerCategorie,
    setSelectedCategories,
    currentVoted,
  } = useVoting();

  const handleReset = () => {
    localStorage.clear();
  };

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <nav className="container">
        <h1>Ballkönig/-in</h1>
      </nav>
      {categories &&
        categories.map((c, i) => (
          <SelectCategorie
            key={i}
            setCategorie={setSelectedCategories}
            selectedCategories={selectedCategories}
            categories={[
              {
                key: c.option1.key,
                title: c.option1.name,
                color: c.option1.color,
              },
              {
                key: c.option2.key,
                title: c.option2.name,
                color: c.option2.color,
              },
            ]}
          />
        ))}
      {display === "voting" && (
        <section className="container">
          <SelectContestant
            isSelected={(id) => currentSelected?._id === id}
            renderData={renderData}
            selectContestant={changeSelectedContestantPerCategorie}
          />
        </section>
      )}
      {display === "voted" && currentVoted && (
        <Voted name={currentVoted?.name} />
      )}
      {display === "banned" && (
        <div className="voted-c">Already voted from this device.</div>
      )}
      <footer className="container">
        {currentSelected && !currentVoted && display !== "banned" && (
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
