"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AddStudentsModal } from "./AddStudentsModal";
import { StudentsTable } from "./StudentsTable";
import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import clsx from "clsx";

interface StudentsProps {
  userId?: string;
  students: any[] | null;
}

export const Students = ({ userId, students }: StudentsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(students);

  useEffect(() => {}, []);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <Card>
        <CardContent className="flex items-center justify-end border p-3">
          <AddStudentsModal personalId={userId} isLoading={isLoading} />
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardContent
          className={clsx(
            "p-0",
            isLoading && "flex items-center justify-center h-full"
          )}
        >
          <StudentsTable data={data} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
};
