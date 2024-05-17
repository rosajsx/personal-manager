"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Separator } from "./ui/separator";

export const Header = () => {
  return (
    <>
      <header className="container py-4">
        <Link href="/internal">Personal-Manager</Link>
      </header>
      <Separator />
    </>
  );
};
