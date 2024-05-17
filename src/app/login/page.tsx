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
import { login } from "../../utils/auth/login";

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
          <form className="flex flex-col gap-4">
            <Input className="w-full" placeholder="E-mail" name="email" />
            <Input className="" placeholder="Senha" name="password" />
            <Button className="w-full" formAction={login}>
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
