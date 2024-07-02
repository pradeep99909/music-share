import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Login from "./Pages/login";
import Artist from "./Pages/artist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "artist",
    element: <Artist />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
