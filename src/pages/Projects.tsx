import { Link } from "react-router-dom";
import useProjects, { Project } from "../hooks/useProjects";
import "./Projects.css";
import ProjectForm from "./../components/ProjectForm";
import Table, { ColumnProps } from "../components/Voting/Table";
import { isBetween } from "../utils/time";

const tableData: ColumnProps<Project>[] = [
  {
    title: "Id",
    key: "_id",
    render(_, item) {
      return <Link to={`/admin/${item._id}`}>{item._id}</Link>;
    },
  },
  { title: "Name", key: "name" },
  {
    title: "Voting Status",
    key: "votesAllowed",
    render(_, item) {
      const { useTime, votingStartDayAndTime, votingEndDayAndTime } =
        item.config;

      if (useTime) {
        const isVotingOpen = isBetween(
          new Date(votingStartDayAndTime),
          new Date(votingEndDayAndTime),
          new Date()
        );

        return (
          <div>
            {isVotingOpen ? (
              <span className="open">Voting is open by Time</span>
            ) : (
              <span className="closed">Voting is closed by Time</span>
            )}
          </div>
        );
      } else {
        return <div className="open">Allways open</div>;
      }
    },
  },
];

const Projects = () => {
  const { data, isLoading, create } = useProjects();
  if (isLoading) return <h1>Loading</h1>;

  return (
    <div>
      <h1>Projects</h1>
      <div className="split">
        <section>
{data.length === 0 ?  <h1>No projects available!</h1> :
          <Table data={data} columns={tableData} />}
        </section>
        <section>
          <ProjectForm create={create} />
        </section>
      </div>
    </div>
  );
};

export default Projects;
