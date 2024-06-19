import { getStudentsByPersonalId } from "@/services/queries/getStudentsByPersonalId";
import { TypedSupabaseClient } from "@/utils/supabase/client";

interface UseGetStudentsQueryProps {
  client: TypedSupabaseClient;
  id: string;
}
export const useGetStudenstQuery = ({
  client,
  id,
}: UseGetStudentsQueryProps) => {
  const queryKey = ["students", id];

  const queryFn = () => {
    return getStudentsByPersonalId(client, id);
  };

  return { queryKey, queryFn };
};
