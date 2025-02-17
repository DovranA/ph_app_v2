"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Input } from "./input";
type Props = {
  id?: string;
  defaultValue?: FormDataEntryValue | null;
  name?: string;
  placeholder?: string;
};
export function DatePicker({ defaultValue, id, name, placeholder }: Props) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <Input
        type="date"
        hidden
        // id={id}
        value={date ? date.toISOString().split("T")[0] : ""}
        defaultValue={defaultValue?.toString()}
        name={name}
        className="hidden"
        readOnly
      />
      <PopoverContent className="w-auto p-0">
        <Calendar
          id={id}
          mode="single"
          selected={date}
          onSelect={(date) => setDate(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
