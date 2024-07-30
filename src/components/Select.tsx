import * as React from "react";

import {
  Select as ShadSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SelectTriggerProps,
  SelectProps as ShadSelectProps,
} from "@radix-ui/react-select";
import { FormControl } from "./ui/form";

export interface SelectItemProps {
  value: string | number;
  title: string;
}

interface SelectProps extends ShadSelectProps {
  placeholder?: string;
  items: SelectItemProps[];
  itemSelected?: string | number;
  triggerProps?: SelectTriggerProps;
}

export function Select({
  placeholder = "",
  itemSelected,
  items,
  triggerProps,
  ...props
}: SelectProps) {
  return (
    <ShadSelect {...props}>
      <FormControl>
        <SelectTrigger {...triggerProps}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {items.map((item) => {
          return (
            <SelectItem key={item.value} value={String(item.value)}>
              {item.title}
            </SelectItem>
          );
        })}
      </SelectContent>
    </ShadSelect>
  );
}
