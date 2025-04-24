import { Metadata } from "next";
import React from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Server Side Rendered",
  description: "This is server side rendered page",
};

const fetchUser = async () => {
    const res = await fetch("https://randomuser.me/api/", {
        cache: "force-cache"
    });
    return await res.json();
}

export default async function page() {
    const user  = await fetchUser();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-5xl">Static Side Rendering: {Date.now()}</p>
        <div>{user?.results[0].name.first}</div>
      </main>
    </div>
  );
}
