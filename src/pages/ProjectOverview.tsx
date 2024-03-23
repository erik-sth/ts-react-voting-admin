import { useEffect, useState } from "react";
import Table, { ColumnProps } from "../components/Table";
import { Vote } from "../hooks/useVotes";
import "./CSS/Projects.css";
import ContestantForm from "../components/Forms/ContestantForm";
import useProjectOverviewHook, {
  AdminContestant,
} from "../hooks/useProjectOverviewHook";
import ProjectSettings from "../components/Forms/ProjectSettings";
import "./CSS/ProjectOverview.css";
import Stats from "./Stats";
import ProjectNav from "../components/Project/ProjectNav";
import { Project } from "../hooks/useProjects";
import CategoriesProvider from "../hooks/voting/CategoriesProvider";
import { hasAllValues } from "../utils/array";
const dataVotes: ColumnProps<Vote>[] = [
  { title: "contestantId", key: "contestandId" },
  { title: "Categories", key: "categories" },
  { title: "Ip", key: "publicIpAddress" },
];

const ProjectOverview = () => {
  const [selectedCategorie, setSelectedCategorie] = useState<
    "votes" | "contestants" | "stats"
  >("contestants");
  const {
    createContestant,
    contestants,
    deleteContestant,
    project,
    votes,
    error,
    loading,
    connected,
  } = useProjectOverviewHook();
  const dataContestant: ColumnProps<AdminContestant>[] = [
    {
      title: "Name",
      key: "name",
    },
    { title: "Categories", key: "categories" },
    { title: "Votes", key: "voteCount" },
    { title: "DuplicateVotes", key: "duplicateVoteCount" },
    {
      title: "Delete",
      key: "",
      render(_column, item) {
        return (
          <button className="delete" onClick={() => deleteContestant(item._id)}>
            Delete
          </button>
        );
      },
    },
  ];

  const { categories, selectedCategories, setNewCategorie, setCategories } =
    CategoriesProvider(false);

  useEffect(() => {
    if (!project) return;
    setCategories(project?.categories);
  }, [project, setCategories]);
  const [displayDuplicateVotes, setDisplayDuplicateVotes] =
    useState<boolean>(true);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredVotes = displayDuplicateVotes
    ? votes
    : votes.filter((v) => !v.duplicateVote);

  const filterContestant = contestants.filter((c) =>
    hasAllValues(c.categories, selectedCategories)
  );

  return (
    <div>
      <ProjectNav
        connected={connected}
        project={project as Project}
        selectedCategorie={selectedCategorie}
        setSelectedCategorie={setSelectedCategorie}
      />
      <div className="filter">
        <label htmlFor="doubleVotes">Display double Votes</label>
        <input
          checked={displayDuplicateVotes}
          onChange={() => setDisplayDuplicateVotes(!displayDuplicateVotes)}
          type="checkbox"
          name=""
          id="doubleVotes"
        />
        {categories &&
          categories.map((categorie) => (
            <span key={categorie.title}>
              <label htmlFor={categorie.title}>{categorie.title}</label>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  setNewCategorie(value, categorie, value == "");
                }}
                name={categorie.title}
                id={categorie.title}
              >
                <option value={""}>Select...</option>
                <option value={categorie.option1.key}>
                  {categorie.option1.name}
                </option>
                <option value={categorie.option2.key}>
                  {categorie.option2.name}
                </option>
              </select>
            </span>
          ))}
      </div>
      <div className="split">
        <section>
          {selectedCategorie === "contestants" && (
            <Table data={filterContestant} columns={dataContestant} />
          )}
          {selectedCategorie === "votes" && (
            <Table data={filteredVotes} columns={dataVotes} />
          )}
          {selectedCategorie === "stats" && (
            <Stats
              displayDuplicateVotes={displayDuplicateVotes}
              contestants={filterContestant}
            />
          )}
        </section>
        {project && (
          <section>
            <ContestantForm create={createContestant} project={project} />
            <h2>Setting</h2>
            <ProjectSettings project={project} />
          </section>
        )}
      </div>
    </div>
  );
};

export default ProjectOverview;
