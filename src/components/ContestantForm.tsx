import React, { useState } from "react";
import { ServerExpectContestant } from "../hooks/useContestantAdmin";
import { Project } from "../hooks/useProjects";

interface Props {
  create: (contestant: ServerExpectContestant) => void;
  project: Project;
}

const ContestantForm = ({ create, project }: Props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"m" | "f">("m");

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
    setGender("m"); // Reset gender to default
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
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value as "m" | "f")}
            required
          >
            <option value="m">Male</option>
            <option value="f">Female</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContestantForm;
