"use client";

import { getExerciseCategories } from "@/actions/exercises/getExerciseCategories";
import { getExerciseType } from "@/actions/exercises/getExerciseType";
import { MultiSelectProps } from "@/components/multiSelect";
import { SelectItemProps } from "@/components/Select";
import { Tooltip } from "@/components/Tooltip";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ExerciseForm } from "./ExerciseForm";

export const schema = z.object({
  name: z.string(),
  video_url: z.string().optional(),
  type: z.string(),
});

export const AddExercisesModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingSelects, setIsLoadingSelects] = useState({
    types: false,
    categories: false,
  });
  const [exerciseTypes, setExerciseTypes] = useState<SelectItemProps[]>([]);
  const [exerciseCategories, setExerciseCategories] = useState<
    MultiSelectProps["options"]
  >([]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: {
      name: "",
      type: "",
      video_url: "",
    },
  });
  const getTypes = async () => {
    try {
      setIsLoadingSelects((prev) => ({ ...prev, types: true }));
      const data = await getExerciseType();
      const parsedData = data?.map((item) => ({
        value: item.id,
        title: item.name,
      }));
      setExerciseTypes(parsedData || []);
    } catch (error) {
      console.log("erro", error);
    } finally {
      setIsLoadingSelects((prev) => ({ ...prev, types: false }));
    }
  };
  const getCategories = async () => {
    try {
      setIsLoadingSelects((prev) => ({ ...prev, categories: true }));
      const data = await getExerciseCategories();
      const parsedData = data?.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setExerciseCategories(parsedData || []);
    } catch (error) {
      console.log("erro", error);
    } finally {
      setIsLoadingSelects((prev) => ({ ...prev, categories: false }));
    }
  };

  useEffect(() => {
    if (isOpen) {
      getTypes();
      getCategories();
    } else {
      form.reset();
    }
  }, [isOpen]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip content="Adicionar exercicio">
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus />
          </Button>
        </AlertDialogTrigger>
      </Tooltip>
      <AlertDialogContent className="pb-0">
        <AlertDialogHeader>
          <AlertDialogTitle>Cadastro de aluno</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha os campos a seguir com os dados do exercicio
          </AlertDialogDescription>
        </AlertDialogHeader>

        <ExerciseForm
          form={form}
          exerciseCategories={exerciseCategories}
          exerciseTypes={exerciseTypes}
          handleModalOpen={setIsOpen}
          isLoadingSelects={isLoadingSelects}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};
