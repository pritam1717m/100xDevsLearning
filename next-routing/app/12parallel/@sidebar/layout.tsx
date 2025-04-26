import Link from "next/link";

export default function ModalLayout({
  children,
  model,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  model: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center"> 
      <div className="w-full h-full flex justify-center items-center">
        {children}
      </div>
      <div className="flex gap-4">
          <Link href={"/12parallel/first"}>First</Link>
          <Link href={"/12parallel/second"}>Second</Link>
      </div>
    </div>
  );
}