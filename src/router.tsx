import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const RegisterForm = lazy(() => import("./pages/RegisterForm"));
const Login = lazy(() => import("./pages/LoginForm"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectOverview = lazy(() => import("./pages/ProjectOverview"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/",
    element: <Projects />,
  },
  {
    path: "/:projectId",
    element: <ProjectOverview />,
  },
]);

export default router;
