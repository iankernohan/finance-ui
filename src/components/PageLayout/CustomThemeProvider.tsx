import React, { createContext, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useStore } from "../../store/store";

export const ThemeContext = createContext({
  toggleTheme: () => {},
  mode: "dark" as "light" | "dark",
});

export const CustomThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const darkMode = useStore((state) => state.darkMode);
  const toggleTheme = useStore((state) => state.toggleDarkMode);

  const getTheme = (mode: "light" | "dark") =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: mode === "dark" ? "#6B21A8" : "#2563EB", // deep royal purple → modern blue
        },
        secondary: {
          main: mode === "dark" ? "#9333EA" : "#60A5FA", // vibrant purple → soft sky blue
        },
        background: {
          default: mode === "dark" ? "#0D0B1D" : "#F9FAFB", // dark violet-black → light gray
          paper: mode === "dark" ? "#1A132F" : "#FFFFFF", // soft dark purple → pure white
        },
        text: {
          primary: mode === "dark" ? "#EDE9FE" : "#1E293B", // lavender white → slate
          secondary: mode === "dark" ? "#C4B5FD" : "#475569", // light purple-gray → muted slate
          disabled: mode === "dark" ? "#1E293B" : "#EDE9FE",
        },
        divider: mode === "dark" ? "#312E81" : "#E2E8F0", // purple-gray border → cool gray border
      },
      typography: {
        fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
        fontSize: 14,
      },
      cssVariables: true,
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none",
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: mode === "dark" ? "#0D0B1D" : "#FFFFFF",
              color: mode === "dark" ? "#EDE9FE" : "#1E293B",
            },
          },
        },
      },
    });

  const theme = useMemo(() => {
    return getTheme(darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <ThemeContext.Provider
      value={{ toggleTheme, mode: darkMode ? "dark" : "light" }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
