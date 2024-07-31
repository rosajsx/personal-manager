"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import { Trash, User } from "lucide-react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { deleteStudentById } from "@/actions/students/deleteStudent";

interface StudentsTableProps {
  data: any[] | null;
}

export const StudentsTable = ({ data }: StudentsTableProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const router = useRouter();

  const onConfirm = async (id: string) => {
    try {
      await deleteStudentById(id);
      toast({ title: "Aluno excluido com sucesso" });
      router.refresh();
    } catch (error) {
      toast({
        title: (error as any)?.message || "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    }
  };

  const onClickItem = (id: string) => {
    setSelectedId(id);
    setIsConfirmModalOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center py-3">Nome</TableHead>
            <TableHead className="text-center py-3">Email</TableHead>
            <TableHead className="text-center py-3">
              Status do pagamento
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium text-center">
                {student.name}
              </TableCell>
              <TableCell className="text-center">{student.email}</TableCell>
              <TableCell className="text-center">
                {student.is_paid ? "Pago" : "Não pago"}
              </TableCell>
              <TableCell className="flex gap-2  justify-end">
                <Tooltip content="Detalhes">
                  <Button variant="outline" size="icon">
                    <User />
                  </Button>
                </Tooltip>
                <Tooltip content="Excluir aluno">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onClickItem(student.id)}
                  >
                    <Trash color="red" />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmModal
        onConfirm={() => {
          onConfirm(selectedId);
        }}
        isOpen={isConfirmModalOpen}
        setIsOpen={setIsConfirmModalOpen}
        triggerSize="icon"
        triggerContent={<Trash color="red" />}
        tooltipText="Excluir aluno"
      />
    </>
  );
};
