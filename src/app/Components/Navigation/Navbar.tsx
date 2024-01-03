"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav>
      <Link href="/">Home</Link>
      &nbsp;
      <Link href={"/posts"}>Posts</Link>
      {session?.user && (
        <>
          &nbsp;
          <Link href={"/new-post"}>Add post</Link>
        </>
      )}
      {session?.user ? (
        <>
          &nbsp;
          {/*  https://next-auth.js.org/configuration/providers/oauth - contains links */}
          <Link href={"/api/auth/signout"}>Logout</Link>
        </>
      ) : (
        <>
          &nbsp;
          <Link href={"/api/auth/signin"}>Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
