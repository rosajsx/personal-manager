"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AddStudentsModal } from "./AddStudentsModal";
import { StudentsTable } from "./StudentsTable";
import clsx from "clsx";

interface StudentsProps {
  userId?: string;
  data: any[];
}

export const Students = ({ userId, data }: StudentsProps) => {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <Card>
        <CardContent className="flex items-center justify-end border p-3">
          <AddStudentsModal personalId={userId} />
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardContent className={clsx("p-0 h-full")}>
          <StudentsTable data={data || []} />
        </CardContent>
      </Card>
    </div>
  );
};
