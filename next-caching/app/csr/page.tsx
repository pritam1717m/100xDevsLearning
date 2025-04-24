"use client";

import React, { useEffect, useState } from "react";

interface Name {
  name: {
    first: string;
  };
}

type Results = {
  results: Array<Name>;
};

export default function ClientPage() {
  const [user, setUser] = useState<Results>();
  useEffect(() => {
    (async () => {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      setUser(data);
    })();
  });
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>Client Side Rendering - {Date.now()}</p>
        <div>{user ? user.results[0].name.first : "Loading"}</div>
      </main>
    </div>
  );
}
