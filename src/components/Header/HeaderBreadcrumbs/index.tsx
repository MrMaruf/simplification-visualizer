import React from "react";
import styles from "./index.module.css";

import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
type Props = {
  navigation: string[];
  fullPath: string | null;
};

const HeaderBreadcrumbs = (props: Props) => {
  const { navigation, fullPath } = props;
  const processedNavigation = navigation.map((path) => {
    const trimmedPath = path.trim();
    const absolutePath = fullPath?.split(path)[0] + path;
    return {
      relativePath: trimmedPath,
      absolutePath,
    };
  });
  if (processedNavigation.length === 0) return <></>;
  return (
    <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      {processedNavigation.map((path, index) => {
        if (path.relativePath.length === 0) return undefined;
        return (
          <Link
            underline="hover"
            color="inherit"
            href={path.absolutePath}
            key={path.relativePath}
          >
            {path.relativePath}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default HeaderBreadcrumbs;
