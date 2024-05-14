import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className="w-screen h-screen  flex justify-center items-center">
      <h1>Home</h1>
      <Link href="/login">
        <Button variant="link">Go to Login</Button>
      </Link>
    </main>
  );
}
