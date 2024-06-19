"use server";

import { z } from "zod";
import { cookies } from "next/headers";

import useSupabaseServer from "@/utils/supabase/server";
import { TypedSupabaseClient } from "@/utils/supabase/client";

const schema = z.object({
  email: z.string({ invalid_type_error: "Invalid Email" }).email(),
  name: z.string(),

  age: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  height: z.string().optional().nullable(),
});

export const addStudents = async (
  formData: FormData,
  personalId: string,
  client?: TypedSupabaseClient
) => {
  const cookieStore = cookies();
  const supabase = client || useSupabaseServer(cookieStore);

  const info = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    age: formData.get("age") as string,
    weight: formData.get("weight") as string,
    height: formData.get("height") as string,
    personal_id: personalId as string,
  };

  const validateFields = schema.safeParse(info);

  if (!validateFields.success) {
    throw new Error("Validation error");
  }

  const response = await supabase.from("students").insert(info).throwOnError();

  return response.statusText;
};
