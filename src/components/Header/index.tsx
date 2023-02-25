"use client";

import React from "react";
import styles from "./index.module.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Page from "@/types/Page";


const pages: Page[] = [
  { name: "Sorting Algorithms", url: "/algorithms/sorting/" },
];

type Props = {};

const Header = (props: Props) => {
  const path = usePathname();
  // console.log("'", path, "'");
  const navigation = path?.split("/");
  // console.log(navigation);

  return (
    <header className={styles.header}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Stack>
            <div className={styles.breadcrumbs}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  Visual Simplifier
                </Link>
                {navigation?.map((path, index) => {
                  const trimmedPath = path.trim();
                  if (trimmedPath.length > 0)
                    return (
                      <Link
                        underline="hover"
                        color="inherit"
                        href={path}
                        key={path}
                      >
                        {trimmedPath}
                      </Link>
                    );
                })}
              </Breadcrumbs>
            </div>
            <Toolbar disableGutters>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  textAlign: "left",
                }}
              >
                Visual Simplifier
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Typography
                    key={page.name}
                    component="a"
                    href={page.url}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Typography>
                ))}
              </Box>
            </Toolbar>
          </Stack>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
