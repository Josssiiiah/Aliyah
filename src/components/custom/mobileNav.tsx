"use client";
import * as React from "react";
import { cn } from "@/utils/ui";
import Image from "next/image";
import menuIcon from "@/../public/ui/menu.png";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/primative/navigation-menu";

export default function MobileNav() {
  return (
    <NavigationMenu className={"md:hidden"}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center justify-center ">
            <Image priority src={menuIcon} alt="Menu" className="h-8 w-8" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col p-4">
              <ListItem href="/" title="Home" />
              <ListItem href="/ask" title="Ask" />
              <ListItem className="blur" href="/" title="Generate" />
              <ListItem className="blur" href="/" title="Explain" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn("block select-none space-y-1 p-3", className)}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-white">
            {title}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
