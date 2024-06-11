"use client";
import { Tooltip } from "@/components/Tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { addStudent } from "@/actions/students";

const schema = z.object({
  email: z.string({ invalid_type_error: "Invalid Email" }).email(),
  name: z.string(),

  age: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  height: z.string().optional().nullable(),
});

interface AddStudentsModalProps {
  personalId?: string;
  isLoading?: boolean;
}

export const AddStudentsModal = ({
  personalId,
  isLoading,
}: AddStudentsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const action = async (data: FormData) => {
    const info = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      age: data.get("age") as string,
      weight: data.get("weight") as string,
      height: data.get("height") as string,
      personal_id: personalId as string,
    };

    const validateFields = schema.safeParse(info);
    if (!validateFields.success) {
      throw new Error("Validation error");
    }

    await addStudent(info);
  };

  return (
    <AlertDialog>
      <Tooltip content="Adicionar estudante">
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="icon" disabled={isLoading}>
            <Plus />
          </Button>
        </AlertDialogTrigger>
      </Tooltip>
      <AlertDialogContent className="pb-0">
        <AlertDialogHeader>
          <AlertDialogTitle>Cadastro de aluno</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha os campos a seguir com os dados do aluno.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form className="flex flex-col gap-4 py-4" action={action}>
          <Input name="name" placeholder="Nome" />
          <Input name="email" placeholder="E-mail" />

          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center justify-between px-2 w-full "
              >
                Informações especificas(Opcional)
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="flex flex-col gap-4 pt-2">
              <Input name="age" placeholder="Idade" />
              <Input name="weight" placeholder="Peso" />
              <Input name="height" placeholder="Altura" />
            </CollapsibleContent>
          </Collapsible>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit" variant="outline">
              Cadastrar
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
