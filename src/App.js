import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SingleRestaurantPage from "./pages/SingleRestaurantPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/res/:resID",
    element: <SingleRestaurantPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
