"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div>
      <nav className={styles.container}>
        <Link
          href="/"
          className="link-success link-offset-2 link-underline-opacity-0 link-underline-opacity-0-hover"
        >
          Home
        </Link>
        &nbsp;
        <Link
          href={"/posts"}
          className="link-success link-offset-2 link-underline-opacity-0 link-underline-opacity-0-hover"
        >
          Posts
        </Link>
        {session?.user && (
          <>
            &nbsp;
            <Link
              href={"/new-post"}
              className="link-success link-offset-2 link-underline-opacity-0 link-underline-opacity-0-hover"
            >
              Add post
            </Link>
          </>
        )}
        {session?.user ? (
          <>
            &nbsp;
            {/*  https://next-auth.js.org/configuration/providers/oauth - contains links */}
            <Link
              href={"/api/auth/signout"}
              className="link-success link-offset-2 link-underline-opacity-0 link-underline-opacity-0-hover"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            &nbsp;
            <Link
              href={"/api/auth/signin"}
              className="link-success link-offset-2 link-underline-opacity-0 link-underline-opacity-0-hover"
            >
              Login
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
