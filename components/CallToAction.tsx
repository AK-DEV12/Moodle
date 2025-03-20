"use client";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import { useAuth } from "@/contexts/AuthContext";

export default function CallToAction() {
  const { currentUser } = useAuth();

  return (
    <div className="flex gap-4 justify-center">
      <Link href={"/dashboard"}>
        <Button text={currentUser ? "Go To Dashboard" : "Sign up"} />
      </Link>
      {!currentUser && (
        <Link href={"/dashboard"}>
          <Button text="Login" dark={true} />
        </Link>
      )}
    </div>
  );
}
