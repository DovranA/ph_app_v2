"use client";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Calendar } from "@/shared/ui/calendar";
import { cn } from "@/lib/utils";
import { Control, Controller } from "react-hook-form";
import { Inputs } from "@/features/patient/actions/create-patient";

type Props = {
  id?: string;
  defaultValue?: Date | null;
  name: "birthday" | "enterAt";
  placeholder?: string;
  control?: Control<Inputs>;
};
export function DatePicker({ name, placeholder, control }: Props) {
  const [calendarKey, setCalendarKey] = React.useState(0);
  const [selectedYear, setSelectedYear] = React.useState<string>();
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required:
          name === "enterAt"
            ? "giren wagtyny girizin"
            : "doglan gününi giriziň",
      }}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" className="w-auto p-0 " align="center">
            <div className="flex gap-2">
              <Select
                onValueChange={(value) => {
                  setSelectedYear(value);
                  const newDate = new Date(field.value || new Date());
                  newDate.setFullYear(parseInt(value, 10));
                  field.onChange(newDate);
                  setCalendarKey((prevKey) => prevKey + 1);
                }}
                value={selectedYear}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Calendar
              key={calendarKey}
              mode="single"
              selected={field.value}
              onSelect={(date) => {
                field.onChange(date);
              }}
              initialFocus
              defaultMonth={field.value || new Date()}
            />
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
