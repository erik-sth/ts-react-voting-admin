import "./SelectCategorie.css";
interface Props {
  selectedCategories: string[];
  categories: {
    key: string;
    title: string;
    color: "blue" | "pink" | "white";
  }[];

  setCategorie: (categories: string[]) => void;
}

const SelectCategorie = ({
  selectedCategories,
  setCategorie,
  categories,
}: Props) => {
  function isSelected(key: string): boolean {
    return (
      selectedCategories?.filter(
        (sC) => sC === categories[0].key || sC === categories[1].key
      )[0] === key
    );
  }

  function filterOut() {
    return selectedCategories.filter(
      (c) => c !== categories[0].key && c !== categories[1].key
    );
  }
  return (
    <section className="radio-input">
      <div
        className={
          isSelected(categories[0].key)
            ? `selectionBtn selectCategorie ${categories[0].color}`
            : "selectionBtn"
        }
        onClick={() => setCategorie([categories[0].key, ...filterOut()])}
      >
        {categories[0].title}
      </div>
      <div
        className={
          isSelected(categories[1].key)
            ? `selectionBtn selectCategorie ${categories[1].color}`
            : "selectionBtn "
        }
        onClick={() => setCategorie([categories[1].key, ...filterOut()])}
      >
        {categories[1].title}
      </div>
      <span className="selection"></span>
    </section>
  );
};

export default SelectCategorie;
