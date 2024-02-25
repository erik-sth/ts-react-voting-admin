import { useState } from "react";
import Table, { ColumnProps } from "../components/Table";
import useVotes, { Vote } from "../hooks/useVotes";
import "./Projects";
import ContestantForm from "../components/Project/ContestantForm";
import useContestantAdmin, {
  AdminContestant,
} from "../hooks/useContestantAdmin";
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom";
import ProjectSettings from "../components/Project/ProjectSettings";

const dataVotes: ColumnProps<Vote>[] = [
  { title: "_id", key: "contestandId" },
  { title: "Categories", key: "categories" },
  { title: "Ip", key: "publicIpAddress" },
];

const ProjectOverview = () => {
  const [selectedCategorie, setSelectedCategorie] = useState<
    "votes" | "contestants"
  >("contestants");
  const { renderData: renderVotes } = useVotes();
  const {
    createContestant,
    renderData: renderContestant,
    deleteContestant,
  } = useContestantAdmin();
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
  const { data: projectData } = useProjects("/" + projectId);
  function getProject() {
    const project = { ...projectData[0] };
    project.config.votingStartDayAndTime = new Date(
      project.config.votingStartDayAndTime
    );
    project.config.votingEndDayAndTime = new Date(
      project.config.votingEndDayAndTime
    );
    return project;
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
        {projectData && projectData[0]?.name}
      </h1>
      <a href={`/${projectId}`}>Vote</a>
      <div className="split">
        <section>
          {selectedCategorie === "contestants" && (
            <Table data={renderContestant} columns={dataContestant} />
          )}
          {selectedCategorie === "votes" && (
            <Table data={renderVotes} columns={dataVotes} />
          )}
        </section>
        {projectData && projectData[0] && (
          <section>
            <ContestantForm create={createContestant} project={getProject()} />
            <h2>Setting</h2>
            <ProjectSettings
              updateProject={() => console.log("project update")}
              project={getProject()}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default ProjectOverview;
