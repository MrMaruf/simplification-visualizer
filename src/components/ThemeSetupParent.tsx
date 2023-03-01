"use client"

import React, { ReactNode } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";

type Props = {
  children: ReactNode;
};

const ThemeSetupParent = (props: Props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

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
