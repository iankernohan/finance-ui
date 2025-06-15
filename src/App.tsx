import { RouterProvider } from "react-router";
import { CustomThemeProvider } from "./components/PageLayout/CustomThemeProvider";
import { router } from "./Router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomThemeProvider>
        <RouterProvider router={router} />;
      </CustomThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
