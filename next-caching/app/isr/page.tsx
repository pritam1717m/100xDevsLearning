import { Metadata } from "next";

export const revalidate = 5;

export const metadata: Metadata = {
    title: "Incremental Static regeneration",
    description: "This is static page"
}

export default function page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-5xl">Static: {Date.now()}</p>
      </main>
    </div>
  );
}
