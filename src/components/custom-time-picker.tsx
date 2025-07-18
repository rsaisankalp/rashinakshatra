"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CustomTimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
const ampmOptions = ["AM", "PM"];

export function CustomTimePicker({ value, onChange }: CustomTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [hour, setHour] = React.useState("12");
  const [minute, setMinute] = React.useState("00");
  const [ampm, setAmpm] = React.useState("AM");

  React.useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      const hourNum = parseInt(h, 10);
      if (hourNum >= 12) {
        setAmpm("PM");
        setHour(hourNum === 12 ? "12" : (hourNum - 12).toString().padStart(2, '0'));
      } else {
        setAmpm("AM");
        setHour(hourNum === 0 ? "12" : hourNum.toString().padStart(2, '0'));
      }
      setMinute(m);
    }
  }, [value]);

  const handleTimeChange = (newHour: string, newMinute: string, newAmpm: string) => {
    let hour24 = parseInt(newHour, 10);
    if (newAmpm === "PM" && hour24 < 12) {
      hour24 += 12;
    }
    if (newAmpm === "AM" && hour24 === 12) {
      hour24 = 0;
    }
    onChange(`${hour24.toString().padStart(2, '0')}:${newMinute}`);
  };

  const handleHourChange = (newHour: string) => {
    setHour(newHour);
    handleTimeChange(newHour, minute, ampm);
  };
  
  const handleMinuteChange = (newMinute: string) => {
    setMinute(newMinute);
    handleTimeChange(hour, newMinute, ampm);
  };

  const handleAmPmChange = (newAmpm: string) => {
    setAmpm(newAmpm);
    handleTimeChange(hour, minute, newAmpm);
  };

  const displayValue = value
    ? `${hour}:${minute} ${ampm}`
    : "Select time";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal h-10",
            !value && "text-muted-foreground"
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {displayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="flex items-center gap-2">
          <Select onValueChange={handleHourChange} value={hour}>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((h) => (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>:</span>
          <Select onValueChange={handleMinuteChange} value={minute}>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Min" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleAmPmChange} value={ampm}>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              {ampmOptions.map((ap) => (
                <SelectItem key={ap} value={ap}>
                  {ap}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
