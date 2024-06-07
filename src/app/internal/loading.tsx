import { RefreshCcw } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <RefreshCcw className="animate-spin" />
    </div>
  );
}
