"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AddStudentsModal } from "./AddStudentsModal";
import { StudentsTable } from "./StudentsTable";
import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useGetStudenstQuery } from "@/hooks/useGetStudentsQuery";

interface StudentsProps {
  userId?: string;
}

export const Students = ({ userId }: StudentsProps) => {
  const client = useSupabaseBrowser();
  const queryData = useGetStudenstQuery({ client, id: userId! });
  const { data, refetch, isLoading, isError, isRefetching } =
    useQuery(queryData);

  console.log("isLoading", isLoading);
  console.log("isRefetching", isRefetching);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <Card>
        <CardContent className="flex items-center justify-end border p-3">
          <AddStudentsModal
            personalId={userId}
            isLoading={isLoading}
            client={client}
          />
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardContent
          className={clsx(
            "p-0 h-full",
            isLoading && "flex items-center justify-center h-full"
          )}
        >
          <StudentsTable
            data={data || []}
            isLoading={isLoading}
            refetch={refetch}
            isRefetching={isRefetching}
          />
        </CardContent>
      </Card>
    </div>
  );
};
