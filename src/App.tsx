import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Suspense } from "react";
import Nav from "./components/Nav";
function App() {
  return (
    <>
      <Suspense>
        <Nav/>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
