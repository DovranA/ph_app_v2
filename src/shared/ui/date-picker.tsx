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
import { Input } from "./input";
type Props = {
  id?: string;
  defaultValue?: Date | null;
  name?: string;
  placeholder?: string;
};
export function DatePicker({ defaultValue, id, name, placeholder }: Props) {
  const [date, setDate] = React.useState<Date>();
  const [calendarKey, setCalendarKey] = React.useState(0);
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i);
  }, []);

  const handleYearChange = (selectedYear: string) => {
    const newYear = parseInt(selectedYear, 10);
    const newDate = date ? new Date(date) : new Date();
    newDate.setFullYear(newYear);
    setDate(newDate);
    setCalendarKey((prevKey) => prevKey + 1);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
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
        value={date ? date.toISOString().split("T")[0] : ""}
        defaultValue={defaultValue?.toString()}
        name={name}
        className="hidden bg-white"
        readOnly
      />
      <PopoverContent side="bottom" className="w-auto p-0 " align="center">
        <div className="flex gap-2">
          <Select
            onValueChange={handleYearChange}
            defaultValue={
              date
                ? date.getFullYear().toString()
                : new Date().getFullYear().toString()
            }
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
          selected={date}
          onSelect={setDate}
          initialFocus
          defaultMonth={date || new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
