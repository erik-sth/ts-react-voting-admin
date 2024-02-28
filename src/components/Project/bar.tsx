interface Props {
  percentage: number;
  maxPercentage: number;
  color: "red" | "blue";
}

const Bar = ({ percentage, maxPercentage, color }: Props) => {
  return (
    <div
      style={{
        width: `${percentage * maxPercentage}%`,
        maxWidth: "80vw",
      }}
      className={`bar ${color}`}
    >
      <div className="percentage">{percentage === 0 ? "" : percentage}</div>
    </div>
  );
};

export default Bar;
