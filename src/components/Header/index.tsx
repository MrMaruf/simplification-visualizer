import React from "react";
import styles from "./index.module.css";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className={styles.header}>
      <p>Visual Simplifier</p>
      <div>
        <a
          href="https://www.linkedin.com/in/maruf-abdirimov-421b56184/"
          target="_blank"
          rel="noopener noreferrer"
        >
          By Maruf Abdirimov
        </a>
      </div>
    </header>
  );
};

export default Header;
