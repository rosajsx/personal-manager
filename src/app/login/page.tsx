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

export const metadata: Metadata = {
  title: "Login",
};

export default function Home() {
  return (
    <main className="w-screen h-screen  flex justify-center items-center">
      <Card className="min-w-[400px] flex flex-col items-center">
        <CardHeader>
          <CardTitle className="text-center ">Entrar</CardTitle>
          <CardDescription className="text-center">
            Entre a sua conta 2
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 w-full">
          <Input className="w-full" placeholder="E-mail" />
          <Input className="" placeholder="Senha" />
        </CardContent>
        <CardFooter className="w-full">
          <Button className="w-full"> Entrar</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
