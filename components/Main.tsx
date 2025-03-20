import React from "react";

export default function Main({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 flex flex-col p-4 sm:p-8">{children}</div>;
}
