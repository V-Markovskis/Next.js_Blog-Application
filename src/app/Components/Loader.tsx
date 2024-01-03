"use client";
import React from "react";
import { useSession } from "next-auth/react";

export default function Loader({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  return <>{status === "loading" ? <div>Loading...</div> : <>{children}</>}</>;
}
