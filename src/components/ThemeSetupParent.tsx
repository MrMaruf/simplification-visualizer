"use client";

import React, { ReactNode, useEffect, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";

type Props = {
  children: ReactNode;
};

const ThemeSetupParent = (props: Props) => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);
  useEffect(() => {
    const result = window.matchMedia("(prefers-color-scheme: dark)");
    setPrefersDarkMode(result.matches);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default ThemeSetupParent;
