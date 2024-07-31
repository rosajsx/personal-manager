"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { ButtonProps } from "./ui/button";

interface ConfirmModalProps {
  onConfirm: () => void;
  title?: string;
  description?: string;

  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  triggerSize?: ButtonProps["size"];
  triggerContent: ReactNode | string;
  tooltipText?: string;
}

export const ConfirmModal = ({
  isOpen,
  onConfirm,
  setIsOpen,
  description = "",
  title = "Tem certeza?",
}: ConfirmModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
