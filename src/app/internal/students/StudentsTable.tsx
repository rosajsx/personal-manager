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
import { RefreshCcw, Trash, User } from "lucide-react";
import { RefreshButton } from "@/components/RefreshButton";
import { ServerActionAction } from "next/dist/client/components/router-reducer/router-reducer-types";
import { useRouter } from "next/navigation";

interface StudentsTableProps {
  data: any[] | null;
  isLoading?: boolean;
}

//! Adicionar animação animate-spin no refresh
//! Quando atualizar, mostrar toast

export const StudentsTable = ({ data, isLoading }: StudentsTableProps) => {
  const router = useRouter();

  if (isLoading) return <RefreshCcw className="animate-spin" />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center py-3">Nome</TableHead>
          <TableHead className="text-center py-3">Email</TableHead>
          <TableHead className="text-center py-3">
            Status do pagamento
          </TableHead>
          <TableHead className="text-end py-3">
            <RefreshButton
              isRefreshing={false}
              action={() => router.refresh()}
            />
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
              <Tooltip content="Apagar estudante">
                <Button variant="outline" size="icon">
                  <Trash color="red" />
                </Button>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
