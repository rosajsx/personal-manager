"use client";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { schema } from "./AddExercisesModal";
import { Select, SelectItemProps } from "@/components/Select";
import { MultiSelect, MultiSelectProps } from "@/components/multiSelect";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { addExercise } from "@/actions/exercises/addExercise";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

interface ExerciseFormProps {
  form: UseFormReturn<z.infer<typeof schema>>;
  handleModalOpen: Dispatch<SetStateAction<boolean>>;
  exerciseTypes: SelectItemProps[];
  exerciseCategories: MultiSelectProps["options"];
  isLoadingSelects: { types: boolean; categories: boolean };
}

export const ExerciseForm = ({
  form,
  handleModalOpen,
  exerciseTypes,
  exerciseCategories,
  isLoadingSelects,
}: ExerciseFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof schema>) {
    setIsLoading(true);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    try {
      await addExercise({
        ...data,
        categories: selectedCategories,
      });

      toast({ title: "Exercicio cadastrado com sucesso" });
      handleModalOpen(false);
      router.refresh();
    } catch (error) {
      toast({
        title: (error as any)?.message || "Ocorreu um erro inesperado",
        variant: "destructive",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(error, null, 2)}</code>
          </pre>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do exercicio" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="video_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url do vídeo</FormLabel>
              <FormControl>
                <Input placeholder="Url do video do exercicio" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select
                placeholder="Selecione o Tipo de exercicio"
                items={exerciseTypes}
                disabled={isLoadingSelects.types}
                onValueChange={field.onChange}
                defaultValue={field.value}
              />

              <FormDescription>
                You can manage email addresses in your{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <MultiSelect
          options={exerciseCategories}
          defaultValue={selectedCategories}
          onValueChange={setSelectedCategories}
          placeholder="Selecione as categorias do exercicio"
          modalPopover
        />

        <AlertDialogFooter className="pt-6">
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button type="submit" disabled={isLoading}>
            Cadastrar
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};
