/**
 * This tamplate.tsx file render the whole ui when we switching the routes of a same directory.
 * But in layout.tsx file holds all the state and does not rendering the ui even after switching the routes
 */

// You can try with the input box by putting a value and switching the route of the same folder

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p>Login or SignUp</p>
      <input type="text" name="" id="" className="border"/>
      <div className="w-full h-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
