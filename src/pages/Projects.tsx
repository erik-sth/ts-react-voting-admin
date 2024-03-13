import { Link } from "react-router-dom";
import useProjects, { Project } from "../hooks/useProjects";
import "./Projects.css";
import ProjectForm from "../components/Forms/ProjectForm";
import Table, { ColumnProps } from "../components/Table";
import { isBetween } from "../utils/time";
import apiClient from "../services/api-client";

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
        const isVotingOpenByTime = isBetween(
          new Date(votingStartDayAndTime),
          new Date(votingEndDayAndTime),
          new Date()
        );

        return (
          <div>
            {isVotingOpenByTime ? (
              <span className="open">Voting is open by Time</span>
            ) : (
              <span className="closed">Voting is closed by Time</span>
            )}
          </div>
        );
      } else {
        return item.config.votingEnabled ? (
          <div className="open">Voting is open by Admin</div>
        ) : (
          <div className="closed">Voting is closed by Admin</div>
        );
      }
    },
  },
];

const Projects = () => {
  const { data, isLoading, create } = useProjects();
  if (isLoading) return <h1>Loading</h1>;

  return (
    <div>
      <h1>Projects</h1>{" "}
      <button onClick={async () => await apiClient.post("/user/logout")}>
        Logout
      </button>
      <div className="split">
        <section>
          {data.length === 0 ? (
            <h1>No projects available!</h1>
          ) : (
            <Table data={data} columns={tableData} />
          )}
        </section>
        <section>
          <ProjectForm create={create} />
        </section>
      </div>
    </div>
  );
};

export default Projects;
