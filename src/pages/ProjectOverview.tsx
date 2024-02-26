import { useState } from "react";
import Table, { ColumnProps } from "../components/Table";
import { Vote } from "../hooks/useVotes";
import "./Projects";
import ContestantForm from "../components/Project/ContestantForm";
import useProjectOverviewHook, {
  AdminContestant,
} from "../hooks/useProjectOverviewHook";
import { useParams } from "react-router-dom";
import ProjectSettings from "../components/Project/ProjectSettings";

const dataVotes: ColumnProps<Vote>[] = [
  { title: "contestantId", key: "contestandId" },
  { title: "Categories", key: "categories" },
  { title: "Ip", key: "publicIpAddress" },
];

const ProjectOverview = () => {
  const [selectedCategorie, setSelectedCategorie] = useState<
    "votes" | "contestants"
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
  const { projectId } = useParams();
  const dataContestant: ColumnProps<AdminContestant>[] = [
    {
      title: "Name",
      key: "name",
    },
    { title: "Categories", key: "categories" },
    { title: "Votes", key: "countedVotes" },
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1
        onClick={() =>
          setSelectedCategorie(
            selectedCategorie === "contestants" ? "votes" : "contestants"
          )
        }
      >
        {project?.name}:{" "}
        {connected ? (
          <span className="open">Connected</span>
        ) : (
          <span className="closed">Not connected</span>
        )}
      </h1>
      <a href={`/${projectId}`}>Vote</a>
      <div className="split">
        <section>
          {selectedCategorie === "contestants" && (
            <Table data={contestants} columns={dataContestant} />
          )}
          {selectedCategorie === "votes" && (
            <Table data={votes} columns={dataVotes} />
          )}
        </section>
        {project && (
          <section>
            <ContestantForm create={createContestant} project={project} />
            <h2>Setting</h2>
            <ProjectSettings
              updateProject={() => console.log("project update")}
              project={project}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default ProjectOverview;
