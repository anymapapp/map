import { createTheme, ThemeOptions } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";
import { components } from "./components";

// Create theme configuration
const themeOptions: ThemeOptions = {
  palette,
  typography,
  components,
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
};

// Create and export the theme
const theme = createTheme(themeOptions);

export default theme;
