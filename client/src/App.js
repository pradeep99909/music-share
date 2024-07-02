import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Login from "./Pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
