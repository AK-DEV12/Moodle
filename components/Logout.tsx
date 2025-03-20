"use client";
import React, { useActionState } from "react";
import Button from "./Button";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Logout() {
  const { logout, currentUser } = useAuth();
  const pathName = usePathname();

  if (!currentUser) {
    return null;
  }

  if (pathName === "/") {
    return (
      <Link href={"/dashboard"}>
        <Button text="Go To Dashboard" />
      </Link>
    );
  }
  return <Button text="Logout" onClick={logout}></Button>;
}
