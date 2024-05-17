"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { User, Dumbbell } from "lucide-react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx/lite";

const routes = [
  {
    name: "Alunos",
    href: "/internal/students",
    Icon: <User size={18} />,
  },
  {
    name: "Treinos",
    href: "/internal/training-list",
    Icon: <Dumbbell size={18} />,
  },
];

export const Menu = () => {
  const pathname = usePathname();

  return (
    <aside className=" max-w-[180px] flex flex-1 border px-6 py-4">
      <NavigationMenu className="items-start">
        <NavigationMenuList className="flex flex-col gap-2">
          {routes.map((route) => (
            <NavigationMenuItem key={route.href}>
              <Link href={route.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(
                    navigationMenuTriggerStyle(),
                    "gap-2 ",
                    route.href === pathname && "bg-accent/50"
                  )}
                >
                  {route.Icon}
                  {route.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  );
};
