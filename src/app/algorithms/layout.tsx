"use client";

import Header from "@/components/Header";
import ThemeSetupParent from "@/components/ThemeSetupParent";
import Container from "@mui/material/Container";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeSetupParent>
      <Container>
        <Header />
        {children}
      </Container>
    </ThemeSetupParent>
  );
}
