import "./SwitchGender.css";
interface Props {
  gender: "m" | "f";
  setGender: (gender: "m" | "f") => void;
}
const SwitchGender = ({ gender, setGender }: Props) => {
  return (
    <section className="radio-input">
      <div
        className={
          gender == "m" ? "selectionBtn selectedGender" : "selectionBtn"
        }
        onClick={() => setGender("m")}
      >
        Männlich
      </div>
      <div
        className={
          gender == "f" ? "selectionBtn selectedGender" : "selectionBtn"
        }
        onClick={() => setGender("f")}
      >
        Weiblich
      </div>
      <span className="selection"></span>
    </section>
  );
};

export default SwitchGender;
