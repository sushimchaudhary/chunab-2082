"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
  options: { value: string | number; label: string; keywords?: string[] }[];
  value: string | number | null;
  onSelect: (value: string | number | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

export function Combobox({
  options,
  value,
  onSelect,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selectedLabel = React.useMemo(() => {
    if (value === null) return null;
    return options.find((option) => option.value === value)?.label;
  }, [value, options]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-11 rounded-md transition-all",
            "bg-cyan-950/20 border-cyan-900/50 text-white",
            "hover:bg-cyan-900/40 hover:border-cyan-500/50 hover:text-cyan-100",
            "focus:ring-2 focus:ring-cyan-500/30",
            className
          )}
        >
          <span className="truncate">
            
            {selectedLabel || <span className="text-white ">{placeholder}</span>}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-cyan-700" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-[--radix-popover-trigger-width] p-0 border-cyan-900/50 bg-[#011c22] overflow-hidden rounded-md shadow-2xl"
      >
        <Command className="bg-[#011c22]">
          <CommandInput 
            placeholder={searchPlaceholder} 
            className="h-11 border-none focus:ring-0 text-white placeholder:text-white/60"
          />
          <CommandList className="border-t border-cyan-900/30 scrollbar-thin scrollbar-thumb-cyan-900/50 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-cyan-900/50 [&::-webkit-scrollbar-thumb]:rounded-full">
            <CommandEmpty className="py-6 text-center text-sm text-cyan-800 italic">
              {emptyText}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={`${option.label} ${option.keywords?.join(" ") || ""}`}
                  onSelect={() => {
                    onSelect(option.value === value ? null : option.value)
                    setOpen(false)
                  }}
                  className={cn(
                    "flex items-center px-3 py-1 cursor-pointer m-1 rounded-sm transition-colors",
                    "aria-selected:bg-cyan-500 aria-selected:text-[#011c22]",
                    "text-cyan-50 hover:bg-cyan-900/50"
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 stroke-[3px]",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="font-medium">{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}