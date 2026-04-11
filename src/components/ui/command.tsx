// ══════════════════════════════════════════
// SABI — Command Palette (Terminal / Cockpit Polish)
// ══════════════════════════════════════════

"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SearchIcon, CheckIcon } from "lucide-react"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-[4px] bg-transparent text-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-[20%] translate-y-0 overflow-hidden rounded-[8px] p-0 border-border/40 bg-background/95 backdrop-blur-xl shadow-2xl sm:max-w-xl border",
          className
        )}
        showCloseButton={showCloseButton}
      >
        <AnimatePresence>
          {props.open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.3 }}
              className="w-full"
            >
              <Command className="[&_[data-slot=command-input-wrapper]]:border-b [&_[data-slot=command-input-wrapper]]:border-white/5 [&_[data-slot=command-input-wrapper]]:px-6 [&_[data-slot=command-input]]:h-16">
                {children}
              </Command>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="flex items-center gap-3 px-4 border-b border-border/10">
      <SearchIcon className="size-4 shrink-0 text-muted-foreground/50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/30 caret-primary py-3",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-[450px] scroll-py-2 overflow-x-hidden overflow-y-auto outline-none p-2",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-12 text-center text-sm text-foreground/30 font-medium uppercase tracking-widest", className)}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-2 text-foreground **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-[10px] **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-[0.15em] **:[[cmdk-group-heading]]:text-muted-foreground/40",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-2 h-px bg-border/5 my-2", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item relative flex cursor-pointer items-center gap-3 rounded-[4px] px-3 py-2.5 text-[13px] outline-none select-none transition-all",
        "aria-selected:bg-primary/5 aria-selected:text-foreground aria-selected:border-l-2 aria-selected:border-primary aria-selected:pl-[10px]",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <div className="ml-auto opacity-0 group-aria-selected/command-item:opacity-100 transition-opacity">
        <CheckIcon className="size-3 h-3 text-primary" />
      </div>
    </CommandPrimitive.Item>
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-[10px] font-mono tracking-widest text-slate-500 group-aria-selected/command-item:text-primary",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
