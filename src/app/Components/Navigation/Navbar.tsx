import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      &nbsp;
      <Link href={"/posts"}>Posts</Link>
      &nbsp;
      <Link href={"/new-post"}>Add post</Link>
    </nav>
  );
};

export default Navbar;
