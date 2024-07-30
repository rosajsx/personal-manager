import { Metadata } from "next";

import { getExercises } from "@/actions/exercises/getExercises";
import { ExerciseTable } from "./ExercisesTable";
import { Card, CardContent } from "@/components/ui/card";
import { AddExercisesModal } from "./AddExercisesModal";

export const metadata: Metadata = {
  title: "Training List",
};

export default async function ExerciseList() {
  const data = await getExercises();

  console.log(data);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <Card>
        <CardContent className="flex items-center justify-between border p-3">
          <h1>Exercicios</h1>
          <AddExercisesModal />
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardContent className="p-0 h-full">
          <ExerciseTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
