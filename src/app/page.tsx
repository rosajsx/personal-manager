import { redirect } from "next/navigation";

export default function Page() {
  redirect("/internal");

  return <div></div>;
}
