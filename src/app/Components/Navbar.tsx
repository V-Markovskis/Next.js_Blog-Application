import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      &nbsp;
      {/*<Link href="/posts">Posts</Link>*/}
    </nav>
  );
};

export default Navbar;
