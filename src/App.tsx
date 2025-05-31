import { createBrowserRouter, RouterProvider } from "react-router";
import PageLayout from "./components/PageLayout/PageLayout";
import Home from "./components/Home/Home";
import History from "./components/History/History";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useStore } from "./store/store";

function App() {
  const darkMode = useStore((state) => state.darkMode);

  const router = createBrowserRouter([
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
      ],
    },
  ]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1565c0",
      },
      secondary: {
        main: "#5fa6e092",
      },
    },
    cssVariables: true,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

export default App;
