import Dashboard from "@/components/Dashboard";
import Main from "@/components/Main";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Moodle - Dashboard",
};

export default function DashboardPage() {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
}
