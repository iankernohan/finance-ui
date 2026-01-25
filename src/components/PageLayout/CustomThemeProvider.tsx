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

  // Slate Grey #404F68 · Silver Grey #C4C4C4 · Steel Grey #777777 · Charcoal Grey #333333 · Granite Grey #4A4A4A
  const getTheme = (mode: "light" | "dark") =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: mode === "dark" ? "#00ADB5" : "#2563EB",
        },
        secondary: {
          main: mode === "dark" ? "#5c5b58" : "#60A5FA",
        },
        background: {
          default: mode === "dark" ? "#171614" : "#F9FAFB",
          paper: mode === "dark" ? "#1f2224" : "#FFFFFF",
        },
        text: {
          primary: mode === "dark" ? "#EDE9FE" : "#1E293B",
          secondary: mode === "dark" ? "#C4B5FD" : "#475569",
          disabled: mode === "dark" ? "#1E293B" : "#EDE9FE",
        },
        divider: mode === "dark" ? "#312E81" : "#E2E8F0",
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
