"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { login } from "../../actions/auth/login";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";

export const Form = () => {
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
    <>
      <form className="flex flex-col gap-4" action={action}>
        <Input className="w-full" placeholder="E-mail" name="email" />
        <Input className="" placeholder="Senha" name="password" />
        <SubmitButton loadingText="Entrando...">Entrar</SubmitButton>
      </form>
      <h1 className={clsx("text-white", error ? "visible" : "invisible")}>
        {error || "Invisible error"}
      </h1>
    </>
  );
};
