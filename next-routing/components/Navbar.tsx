import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex flex-row h-20 items-center justify-center bg-cyan-700">
      <div className="flex gap-2.5">
        <Link href={"/"}>Landing</Link>
        <Link href={"/1home"}>Home</Link>
        <Link href={"/2about"}>About</Link>
        <Link href={"/3parent/nested"}>Nested</Link>
        <Link href={"/4products"}>Dynamic</Link>
        <Link href={"/5productss"}>Dynamic_Nested</Link>
        <Link href={"/6allsegment_optional"}>All_Segment_Optional</Link>
        <Link href={"/10nested_not_found/101"}>Nested_Not_Found</Link>
        <Link href={"/11error"}>Error</Link>
        <Link href={"/12parallel"}>Parallel</Link>
        <Link href={"/13parallel_defaults"}>Parallel_Defaults</Link>
        <Link href={"/14intercept_routes"}>Intercept_Routes</Link>
        <Link href={"/15intercept_root_route"}>Intercept_Root_Route</Link>
      </div>
      <div className="mx-2 flex gap-2">
        <Link href={"/chat"}>Chat</Link>
        <Link href={"/blog"}>Blog</Link>
      </div>
      <div className="flex gap-2">
        <Link href={"/login"}>Login</Link>
        <Link href={"/signup"}>Signup</Link>
      </div>
    </div>
  );
}
