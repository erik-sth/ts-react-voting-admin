import {
  Categories,
  ServerExpectedProjectData,
  colorSelection,
} from "../../hooks/useProjects";
import Table, { ColumnProps } from "../Voting/Table";

interface Props {
  newProject: ServerExpectedProjectData;
  updateProject: (project: ServerExpectedProjectData) => void;
}

const CategoriesForm = ({ newProject, updateProject }: Props) => {
  const handleCategoryChangeName = (
    index: number,
    field: "option1" | "option2",
    value: string
  ) => {
    const updatedCategories = [...newProject.categories];

    updatedCategories[index][field].name = value;
    updatedCategories[index][field].key = value[0].toLowerCase();

    updateProject({
      ...newProject,
      categories: updatedCategories,
    });
  };
  const handleCategoryChangeColor = (
    index: number,
    field: "option1" | "option2",
    value: string
  ) => {
    const updatedCategories = [...newProject.categories];

    // Convert the string value to colorSelection type
    const color: colorSelection = value as colorSelection;

    updatedCategories[index][field].color = color;

    updateProject({
      ...newProject,
      categories: updatedCategories,
    });
  };

  const handleTitleChange = (index: number, value: string) => {
    const updatedCategories = [...newProject.categories];
    updatedCategories[index].title = value;

    updateProject({
      ...newProject,
      categories: updatedCategories,
    });
  };

  const addCategory = () => {
    updateProject({
      ...newProject,
      categories: [
        ...newProject.categories,
        {
          option1: { color: "white", key: "", name: "" },
          option2: { color: "white", key: "", name: "" },
          title: "",
        },
      ],
    });
  };

  const removeCategory = (index: number) => {
    const updatedCategories = [...newProject.categories];
    updatedCategories.splice(index, 1);

    updateProject({
      ...newProject,
      categories: updatedCategories,
    });
  };
  const data: ColumnProps<Categories>[] = [
    {
      title: "Title",
      key: "title",
      render(_, item, index) {
        return (
          <input
            type="text"
            value={item.title}
            id={`categoryTitle${index}`}
            onChange={(e) => handleTitleChange(index, e.target.value)}
          />
        );
      },
    },
    {
      title: "Options",
      key: "option1",
      render(_column, _item, index) {
        return (
          <span>
            <input
              onChange={(e) =>
                handleCategoryChangeName(index, "option1", e.target.value)
              }
            />
            <input
              onChange={(e) =>
                handleCategoryChangeName(index, "option2", e.target.value)
              }
            />
          </span>
        );
      },
    },
    {
      title: "Color",
      key: "option1",
      render(_column, _item, index) {
        return (
          <span>
            <select
              onChange={(e) =>
                handleCategoryChangeColor(index, "option1", e.target.value)
              }
              name=""
              id=""
            >
              <option value="white">white</option>
              <option value="pink">pink</option>
              <option value="blue">blue</option>
            </select>
            <select
              onChange={(e) =>
                handleCategoryChangeColor(index, "option2", e.target.value)
              }
              name=""
              id=""
            >
              <option value="white">white</option>
              <option value="pink">pink</option>
              <option value="blue">blue</option>
            </select>
          </span>
        );
      },
    },

    {
      title: "Remove",
      key: "",
      render(_column, _item, index) {
        return <button onClick={() => removeCategory(index)}>Remove</button>;
      },
    },
  ];

  return (
    <div>
      <label htmlFor="categories">Categories:</label>
      <Table columns={data} data={newProject.categories}></Table>

      <button type="button" onClick={addCategory}>
        Add Category
      </button>
    </div>
  );
};

export default CategoriesForm;
