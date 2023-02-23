"use client";

import Header from "@/components/Header";
import Container from "@mui/material/Container";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
      <Container>{children}</Container>
    </main>
  );
}
