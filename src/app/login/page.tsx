import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Metadata } from "next";

import { Form } from "./form";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
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
          <Form />
        </CardContent>
      </Card>
    </main>
  );
}
