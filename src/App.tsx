import { RouterProvider } from "react-router";
import { CustomThemeProvider } from "./components/PageLayout/CustomThemeProvider";
import { router } from "./Router";

function App() {
  return (
    <CustomThemeProvider>
      <RouterProvider router={router} />;
    </CustomThemeProvider>
  );
}

export default App;
