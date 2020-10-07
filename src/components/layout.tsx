import React, { ReactNode } from "react";

import Socials from "./socials";
import Profile from "./profile";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row md:h-screen">
      <header className="px-16 py-20 centre flex flex-col justify-between items-center text-white bg-blue-900">
        <Profile />
        <Socials />
      </header>
      <main className="px-12 sm:px-16 py-20 flex-grow md:overflow-y-scroll">
        {children}
      </main>
    </div>
  );
};

export default Layout;
