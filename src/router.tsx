import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Voting = lazy(() => import("./pages/Voting"));
const Login = lazy(() => import("./pages/Login"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectOverview = lazy(() => import("./pages/ProjectOverview"));

const router = createBrowserRouter([
  {
    path: "/:projectId",
    index: true,
    element: <Voting />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Projects />,
  },
  {
    path: "/admin/:projectId",
    element: <ProjectOverview />,
  },
]);

export default router;
