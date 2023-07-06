import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/primative/popover";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/primative/avatar";

import { Separator } from "@/components/primative/separator";

import { signIn, signOut, useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  return (
    <div>
      <Popover>
        <PopoverTrigger className="mt-2 lg:mt-0">
          <Avatar>
            <AvatarImage src={session.user?.image} />
            <AvatarFallback className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-center text-4xl font-bold text-transparent">
              {session.user.name[0]}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="mr-6 mt-4">
          <div className="space-y-2 font-medium m-2 leading-none text-white md:text-lg lg:text-xl">
            <p>{session.user.name}</p>
            <Separator className="opacity-50" />
            <button onClick={() => void signOut()}>Sign Out</button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Profile;
