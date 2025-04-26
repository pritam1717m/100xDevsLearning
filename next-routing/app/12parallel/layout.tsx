export default function Layout({
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
            <div className="w-2/5">{sidebar}</div>
            <div className="w-2/5">{model}</div>
        </div>
      </div>
    );
  }
  