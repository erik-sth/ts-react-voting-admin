import extLinkSvg from "../../assets/ext-link.svg";
import { Project } from "../../hooks/useProjects";

interface Props {
  project: Project;
  connected: boolean;
  selectedCategorie: "votes" | "contestants" | "stats";
  setSelectedCategorie: (categorie: "votes" | "contestants" | "stats") => void;
}

const ProjectNav = ({
  connected,
  project,
  setSelectedCategorie,
  selectedCategorie,
}: Props) => {
  return (
    <nav>
      <h1>
        {project?.name}:{" "}
        {connected ? (
          <span className="open">Connected</span>
        ) : (
          <span className="closed">Not connected</span>
        )}
        <a
          className="extLinkBtn"
          aria-label="Open voting page..."
          href={`https://${window.location.hostname}/${project._id}`}
        >
          <img src={extLinkSvg} className="extLink" alt="" />
        </a>
      </h1>
      <div>
        <label htmlFor="pageSelect">Select page</label>
        <select
          onChange={(e) =>
            setSelectedCategorie(
              e.target.value as "votes" | "contestants" | "stats"
            )
          }
          value={selectedCategorie}
          className="select"
          id="pageSelect"
        >
          <option value="votes">votes</option>
          <option value="contestants">contestant</option>
          <option value="stats">stats</option>
        </select>
      </div>
    </nav>
  );
};

export default ProjectNav;
