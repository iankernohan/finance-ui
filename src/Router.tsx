import { createBrowserRouter } from "react-router";
import PageLayout from "./components/PageLayout/PageLayout";
import Home from "./components/Home/Home";
import History from "./components/History/History";
import AddTransaction from "./components/AddTransaction";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/addTransaction/:categoryId",
        element: <AddTransaction />,
      },
    ],
  },
]);
