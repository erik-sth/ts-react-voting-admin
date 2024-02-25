import { useCallback, useEffect, useState } from "react";
import { ServerExpectContestant } from "../../hooks/useContestantAdmin";
import { Project } from "../../hooks/useProjects";

interface Props {
  create: (contestant: ServerExpectContestant) => void;
  project: Project;
}

const ContestantForm = ({ create, project }: Props) => {
  const [newContestant, setNewContestant] = useState<ServerExpectContestant>({
    name: "",
    categories: [],
  });

  // Fix the typo in function name
  const setDefaultValueForNewContestant = useCallback(() => {
    setNewContestant({
      name: "",
      categories: project?.categories?.map((c) => c.option1.key) || [],
    });
  }, [project?.categories]);

  // Call the useCallback function as a dependency in useEffect
  useEffect(() => {
    setDefaultValueForNewContestant();
  }, [setDefaultValueForNewContestant]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    create(newContestant);
    setDefaultValueForNewContestant();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="height35">
        <h2>Add Contestant</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={newContestant.name}
            onChange={(e) =>
              setNewContestant({
                ...newContestant,
                name: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          {project?.categories &&
            project.categories.map((categories) => (
              <div key={categories.title}>
                <label htmlFor={categories.title}>{categories.title}</label>
                <select
                  value={
                    newContestant.categories.filter(
                      (c) =>
                        c == categories.option1.key ||
                        c == categories.option2.key
                    )[0]
                  }
                  onChange={(e) => {
                    function filterOut() {
                      return newContestant.categories.filter(
                        (contestantCategories) =>
                          contestantCategories !== categories.option1.key &&
                          contestantCategories !== categories.option2.key
                      );
                    }
                    setNewContestant({
                      ...newContestant,
                      categories: [...filterOut(), e.target.value],
                    });
                  }}
                  name={categories.title}
                  id={categories.title}
                >
                  <option value={categories.option1.key}>
                    {categories.option1.name}
                  </option>
                  <option value={categories.option2.key}>
                    {categories.option2.name}
                  </option>
                </select>
              </div>
            ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContestantForm;
