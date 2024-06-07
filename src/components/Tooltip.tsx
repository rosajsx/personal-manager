"use client";
import {
  Tooltip as TooltipContainer,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PropsWithChildren, ReactNode } from "react";

export interface TooltipProps {
  content: string | ReactNode;
}

export const Tooltip = ({
  children,
  content,
}: PropsWithChildren<TooltipProps>) => {
  const isContentText = typeof content === "string";

  return (
    <TooltipProvider>
      <TooltipContainer>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          {isContentText ? <p>{content}</p> : content}
        </TooltipContent>
      </TooltipContainer>
    </TooltipProvider>
  );
};
