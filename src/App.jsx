import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Menu from "./features/menu/Menu";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
]);

function App() {
  return <RouterProvider route={router} />;
}

export default App;
