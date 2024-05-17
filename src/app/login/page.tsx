"use client";
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
import { login } from "../../actions/auth/login";
import { SubmitButton } from "@/components/SubmitButton";
import { useActionState, useState } from "react";
import { clsx } from "clsx";

// export const metadata: Metadata = {
//   title: "Login",
// };

export default function Login() {
  const [error, setError] = useState();

  const action = async (data: FormData) => {
    try {
      setError(undefined);
      await login(data);
    } catch (error) {
      const err = error as any;
      console.log("error", err.message);
      setError(err?.message);
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Card className="min-w-[400px] flex flex-col items-center">
        <CardHeader>
          <CardTitle className="text-center ">Entrar</CardTitle>
          <CardDescription className="text-center">
            Entre a sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 w-full">
          <form className="flex flex-col gap-4" action={action}>
            <Input className="w-full" placeholder="E-mail" name="email" />
            <Input className="" placeholder="Senha" name="password" />
            <SubmitButton loadingText="Entrando...">Entrar</SubmitButton>
          </form>
          <h1 className={clsx("text-white", error ? "visible" : "invisible")}>
            {error || "Invisible error"}
          </h1>
        </CardContent>
      </Card>
    </main>
  );
}
