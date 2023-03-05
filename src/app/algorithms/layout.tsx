"use client";

import Header from "@/components/Header";
import { SortingStateProvider } from "@/store/SortingContext";
import Container from "@mui/material/Container";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SortingStateProvider>
      <Container>
        <Header />
        {children}
      </Container>
    </SortingStateProvider>
  );
}
