import { useState } from "react";
import Table, { ColumnProps } from "../components/Voting/Table";
import useVotes, { Vote } from "../hooks/useVotes";
import "./Projects";
import ContestantForm from "./../components/ContestantForm";
import useContestantAdmin, {
  AdminContestant,
} from "../hooks/useContestantAdmin";
import useProjects from "../hooks/useProjects";
import ProjectForm from "./../components/ProjectForm";
import { useParams } from "react-router-dom";

const dataVotes: ColumnProps<Vote>[] = [
  { title: "_id", key: "contestandId" },
  { key: "gender", title: "Gender" },
  { key: "Ip", title: "publicIpAddress" },
  { key: "remotePort", title: "remotePort" },
];
const dataContestant: ColumnProps<AdminContestant>[] = [
  {
    title: "Name",
    key: "name",
  },
  { title: "Gender", key: "gender" },
  { title: "Votes", key: "countedVotes" },
];
const ProjectOverview = () => {
  const [selectedCategorie, setSelectedCategorie] = useState<
    "votes" | "contestants"
  >("contestants");
  const { renderData: renderVotes } = useVotes();
  const { createContestant, renderData: renderContestant } =
    useContestantAdmin();
  const { projectId } = useParams();
  const { data: projectData, create } = useProjects("/" + projectId);
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
        <section>
          <ContestantForm create={createContestant} />
          <h2>Setting</h2>
          <ProjectForm create={create} />
        </section>
      </div>
    </div>
  );
};

export default ProjectOverview;
