import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="text-xl">
      <p>Dynamic Nested</p>
      <div className="flex gap-10">
        <Link href={"5productss/1"}>1</Link>
        <Link href={"5productss/2"}>2</Link>
        <Link href={"5productss/3"}>3</Link>
        <Link href={"5productss/4"}>4</Link>
      </div>
    </div>
  );
}
