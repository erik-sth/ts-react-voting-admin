import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Voting = lazy(() => import("./pages/Voting"));

const router = createBrowserRouter([
  {
    path: "/:projectId",
    index: true,
    element: <Voting />,
  },
]);

export default router;
