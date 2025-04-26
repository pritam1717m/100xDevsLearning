import Link from "next/link";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div className="text-2xl"><p>Product : {id}</p>
  <Link className="text-blue-500" href={`/5productss/${id}/comments`} >comments</Link></div>;
}
