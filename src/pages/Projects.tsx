import { Link } from "react-router-dom";
import useProjects, { Project } from "../hooks/useProjects";
import "./CSS/Projects.css";
import ProjectForm from "../components/Forms/ProjectForm";
import Table, { ColumnProps } from "../components/Table";
import { isBetween } from "../utils/time";
import Paginate from "../components/Paginate";
import { useState } from "react";

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
      const isVotingOpenByTime = isBetween(
        new Date(votingStartDayAndTime),
        new Date(votingEndDayAndTime),
        new Date()
      );
      if (useTime && isVotingOpenByTime)
        return <span className="open">Voting is open by Time</span>;
      if (useTime && !isVotingOpenByTime)
        return <span className="closed">Voting is closed by Time</span>;
      if (!useTime && item.config.votingEnabled)
        return <div className="open">Voting is open by Admin</div>;
      return <div className="closed">Voting is closed by Admin</div>;
    },
  },
];
const CURRENT_LIMIT = 20
const Projects = () => {

  const [page, setPage] = useState(1);
  const { data, isLoading, create, count } = useProjects("", page, CURRENT_LIMIT);
  if (isLoading) return <h1>Loading</h1>;
  return (
    <div>
      <h1>Projects</h1>
      <p>You have access to {count} projects.</p>
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
      <Paginate currentLimit={CURRENT_LIMIT} count={count} currentPageNumber={page} setPage={setPage} isLoading={false} />
    </div>
  );
};

export default Projects;
