import { Button } from "@/components/ui/button";
import { signout } from "@/utils/auth/signout";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default function Internal() {
  return (
    <div className="flex flex-col gap-4 items-center  w-full justify-center">
      <h1>Home</h1>
      <Link href="/login">
        <Button variant="link">Go to Login</Button>
      </Link>

      <form>
        <Button formAction={signout}>Sair</Button>
      </form>
    </div>
  );
}
