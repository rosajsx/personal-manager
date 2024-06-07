"use client";

import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import clsx from "clsx";
import { Tooltip } from "./Tooltip";

export interface RefreshButtonProps {
  action: () => void;
  isRefreshing: boolean;
}

export const RefreshButton = ({ isRefreshing, action }: RefreshButtonProps) => {
  return (
    <Tooltip content="Atualizar">
      <Button variant="outline" size="icon" onClick={action}>
        <RefreshCcw className={clsx(isRefreshing && "animate-spin")} />
      </Button>
    </Tooltip>
  );
};
