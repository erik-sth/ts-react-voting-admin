import React, { useState } from "react";
import { ServerExpectContestant } from "../hooks/useContestantAdmin";
import { Project } from "../hooks/useProjects";
import SelectCategorie from "./Voting/SelectCategorie";

interface Props {
  create: (contestant: ServerExpectContestant) => void;
  project: Project;
}

const ContestantForm = ({ create, project }: Props) => {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Create contestant object
    const newContestant: ServerExpectContestant = {
      name: name,
      categories: [],
    };
    // Call create function with the contestant object
    create(newContestant);
    // Clear form fields
    setName("");
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          {project?.categories &&
            project?.categories.map((c, i) => (
              <SelectCategorie
                key={i}
                setCategorie={() => console.log("not implemented")}
                selectedCategories={[]}
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
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContestantForm;
