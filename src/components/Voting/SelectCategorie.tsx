import "./SelectCategorie.css";
import { colorSelection } from "../../hooks/useProjects";
interface Props {
  selectedCategories: string[];
  categories: {
    key: string;
    title: string;
    color: colorSelection;
  }[];

  setCategorie: (categories: string[]) => void;
}

const SelectCategorie = ({
  selectedCategories,
  setCategorie,
  categories,
}: Props) => {
  function filterOut() {
    return selectedCategories.filter(
      (c) => c !== categories[0].key && c !== categories[1].key
    );
  }
  function isSelected(key: string): boolean {
    return (
      selectedCategories?.filter(
        (sC) => sC === categories[0].key || sC === categories[1].key
      )[0] === key
    );
  }
  function setToOption1() {
    setCategorie([...filterOut(), categories[0].key]);
  }
  function setToOption2() {
    setCategorie([...filterOut(), categories[1].key]);
  }
  return (
    <section className="categorie-input">
      <div
        className={
          isSelected(categories[0].key)
            ? `selectionBtn selectCategorie ${categories[0].color}`
            : "selectionBtn"
        }
        onClick={setToOption1}
      >
        {categories[0].title}
      </div>
      <div
        className={
          isSelected(categories[1].key)
            ? `selectionBtn selectCategorie ${categories[1].color}`
            : "selectionBtn "
        }
        onClick={setToOption2}
      >
        {categories[1].title}
      </div>
      <span className="selection"></span>
    </section>
  );
};

export default SelectCategorie;
