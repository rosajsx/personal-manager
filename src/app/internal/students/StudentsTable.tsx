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

interface StudentsTableProps {
  data: any[] | null;
}

export const StudentsTable = ({ data }: StudentsTableProps) => {
  return (
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
