import Bar from "../components/Project/bar";
import { AdminContestant } from "../hooks/useProjectOverviewHook";
import "./Stats.css";

interface Props {
  contestants: AdminContestant[];
  displayDuplicateVotes: boolean;
}
const Stats = ({ contestants, displayDuplicateVotes }: Props) => {
  let sorted = contestants?.sort(
    (a, b) =>
      b.voteCount + b.duplicateVoteCount - (a.voteCount + a.duplicateVoteCount)
  );
  if ( !displayDuplicateVotes)
    sorted = contestants?.sort((a, b) => b.voteCount + -a.voteCount);
  const maxScore = contestants[0]?.voteCount + contestants[0]?.duplicateVoteCount;
  const maxWidth = 80 / maxScore;
  return (
    <div>
      <ul>
        {sorted?.map((c) => (
          <li key={c._id}>
            <div className="name">{c.name} :</div>
            <div className="bars">
              <Bar
                color="blue"
                maxPercentage={maxWidth}
                percentage={c.voteCount}
              />
              {displayDuplicateVotes && (
                <Bar
                  color="red"
                  maxPercentage={maxWidth}
                  percentage={c.duplicateVoteCount}
                />
              )}
            </div>

            <div className="score">
              {displayDuplicateVotes ? c.duplicateVoteCount + c.voteCount: c.voteCount}
            </div>
          </li>
        ))}{" "}
        <li key="scale" className="scale">
          <div className="name">Scale :</div>
          <div className="bars">
            <Bar
              color="blue"
              maxPercentage={maxWidth}
              percentage={(maxScore * 5) / 4}
            />
          </div>

          <div className="score">{maxScore * (5 / 4)}</div>
        </li>
      </ul>
    </div>
  );
};

export default Stats;
