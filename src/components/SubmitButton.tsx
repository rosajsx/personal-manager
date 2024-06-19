"use client";

import { useFormStatus } from "react-dom";
import { ButtonProps, Button } from "./ui/button";

interface SubmitButtonProps extends ButtonProps {
  loadingText: string;
  isLoading?: boolean;
}

export const SubmitButton = ({
  loadingText,
  children,
  isLoading,
  ...rest
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      {...rest}
      type="submit"
      disabled={rest.disabled || pending || isLoading}
      aria-disabled={rest.disabled || pending}
    >
      {pending || isLoading ? loadingText : children}
    </Button>
  );
};
