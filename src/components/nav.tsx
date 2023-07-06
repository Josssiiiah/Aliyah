import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/primative/button";

import MobileNav from "@/components/custom/mobileNav";
import DesktopNav from "@/components/custom/desktopNav";
import Profile from "@/components/custom/profile";

function Nav() {
  const { data: session } = useSession();

  return (
    <>
      <div className="sticky top-0 border-b border-zinc-800 flex w-screen flex-row justify-between bg-deepblue p-8">
        <MobileNav />
        <DesktopNav />

        {session ? (
          <Profile />
        ) : (
          <>
            <Button
              size="sm"
              className="my-auto md:mx-8 lg:hidden"
              onClick={session ? () => void signOut() : () => void signIn()}
            >
              {session ? "Sign out" : "Sign in"}
            </Button>
            <Button
              size="default"
              className="my-auto hidden font-extrabold md:mx-8 lg:flex"
              onClick={session ? () => void signOut() : () => void signIn()}
            >
              {session ? "Sign out" : "Sign in"}
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default Nav;
