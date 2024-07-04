import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Pages/login";
import Artist from "./Pages/artist";
import Share from "./Pages/share";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "artist",
    element: <Artist />,
  },
  {
    path: "share/:id",
    element: <Share />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
