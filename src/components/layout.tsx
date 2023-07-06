import React from "react";
import Nav from "@/components/nav";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
}
