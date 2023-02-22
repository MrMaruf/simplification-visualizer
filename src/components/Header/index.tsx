"use client";

import React from "react";
import styles from "./index.module.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

type Page = {
  name:string;
  url:string;
}
const pages:Page[] = [{name:"Sorting Algorithms", url:"/algorithms/sorting/"}];

type Props = {};

const Header = (props: Props) => {
  return (
    <header className={styles.header}>
      <AppBar position="static">
        <Container maxWidth="xl">
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
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
