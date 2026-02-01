import { RouterProvider } from "react-router";
import { CustomThemeProvider } from "./components/PageLayout/CustomThemeProvider";
import { router } from "./Router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CustomThemeProvider>
          <RouterProvider router={router} />;
        </CustomThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
