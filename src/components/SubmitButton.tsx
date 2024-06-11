"use client";

import { useFormStatus } from "react-dom";
import { ButtonProps, Button } from "./ui/button";

interface SubmitButtonProps extends ButtonProps {
  loadingText: string;
}

export const SubmitButton = ({
  loadingText,
  children,
  ...rest
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      {...rest}
      type="submit"
      disabled={rest.disabled || pending}
      aria-disabled={rest.disabled || pending}
    >
      {pending ? loadingText : children}
    </Button>
  );
};
