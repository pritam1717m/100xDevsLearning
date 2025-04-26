import Link from "next/link";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="text-2xl">
      <p>Products : {id}</p>
      <div className="flex gap-8">
        <p>Comments: </p>
        <Link href={`/5productss/${id}/comments/1`}>1</Link>
        <Link href={`/5productss/${id}/comments/2`}>2</Link>
      </div>
    </div>
  );
}
