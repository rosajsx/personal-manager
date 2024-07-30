"use client";

import { getExerciseCategories } from "@/actions/exercises/getExerciseCategories";
import { getExerciseType } from "@/actions/exercises/getExerciseType";
import { MultiSelect, MultiSelectProps } from "@/components/multiSelect";
import { Select, SelectItemProps } from "@/components/Select";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "@/components/ui/use-toast";
import { addExercise } from "@/actions/exercises/addExercise";
import { useRouter } from "next/navigation";
//TODO Adicionar Combo box para categorias

const schema = z.object({
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
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const router = useRouter();

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
      console.log("data", data);
    } catch (error) {
      console.log("erro", error);
    } finally {
      setIsLoadingSelects((prev) => ({ ...prev, categories: false }));
    }
  };

  async function onSubmit(data: z.infer<typeof schema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    try {
      await addExercise({
        ...data,
        categories: selectedCategories,
      });

      toast({ title: "Exercicio cadastrado com sucesso" });
      setIsOpen(false);
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
    }
  }

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
      </AlertDialogContent>
    </AlertDialog>
  );
};
