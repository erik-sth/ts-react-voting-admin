import SelectCategorie from "../components/Voting/SelectCategorie";
import Voted from "./voting/Voted";
import SelectContestant from "../components/Voting/SelectContestant";
import useVoting from "../hooks/voting/VotingPageManager";
import "./Voting.css";
import SpammingDetected from "./voting/SpammingDetected";

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

  return (
    <>
      <nav className="container">
        <h1>Ballkönig/-in</h1>
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
      </nav>
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
      {display === "spam" && <SpammingDetected />}
      {display === "banned" && (
        <div className="voted-c">Already voted from this device.</div>
      )}
      <footer className="container">
        {currentSelected && display === "voting" && !currentVoted && (
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
