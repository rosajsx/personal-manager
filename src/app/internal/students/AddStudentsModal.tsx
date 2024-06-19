"use client";
import { Tooltip } from "@/components/Tooltip";
import {
  AlertDialog,
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
import { addStudents } from "@/actions/students/addStudent";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/SubmitButton";

interface AddStudentsModalProps {
  personalId?: string;
  isLoading?: boolean;
}

export const AddStudentsModal = ({
  personalId,
  isLoading,
}: AddStudentsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const router = useRouter();

  const action = async (data: FormData) => {
    try {
      await addStudents(data!, personalId!);
      setIsOpenModal(false);
      router.refresh();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <AlertDialog open={isOpenModal} onOpenChange={setIsOpenModal}>
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
            <SubmitButton loadingText="Carregando...">Cadastrar</SubmitButton>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
