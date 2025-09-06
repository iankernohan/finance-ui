import { createBrowserRouter } from "react-router";
import PageLayout from "./components/PageLayout/PageLayout";
import Home from "./components/Home/Home";
import History from "./components/History/History";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import Profile from "./components/Profile/Profile";
import BudgetBuilder from "./components/Budget/BudgetBuilder";
import Settings from "./components/Settings/Settings";
import RecurringTransactions from "./components/Settings/RecurringTransactions";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PageLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "history",
          element: <History />,
        },
        {
          path: "addTransaction/:categoryId",
          element: <AddTransaction />,
        },
        {
          path: "profile",
          element: <Profile />,
          children: [
            {
              path: "settings",
              element: <Settings />,
            },
            {
              path: "recurring-transactions",
              element: <RecurringTransactions />,
            },
          ],
        },

        {
          path: "budget",
          children: [
            {
              path: "budgetBuilder",
              element: <BudgetBuilder />,
            },
          ],
        },
      ],
    },
  ],
  { basename: "/finance-ui/" }
);
