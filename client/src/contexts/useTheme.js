// src/contexts/useTheme.js
import { useContext } from "react";
import { ThemeContext } from "./ThemeContextContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
