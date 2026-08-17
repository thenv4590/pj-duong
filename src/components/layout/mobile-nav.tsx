"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, type NavChild } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Mở menu điều hướng"
        className="inline-flex items-center justify-center rounded-md p-2 text-ink hover:bg-accent lg:hidden"
      >
        <Menu className="size-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] max-w-sm p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="text-left text-brand">Menu</SheetTitle>
        </SheetHeader>
        <nav aria-label="Menu di động" className="flex flex-col overflow-y-auto py-2">
          {mainNav.map((item) => (
            <MobileNavItem key={item.label} item={item} depth={0} onNavigate={close} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function MobileNavItem({
  item,
  depth,
  onNavigate,
}: {
  item: NavChild;
  depth: number;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn(depth === 0 && "border-b last:border-b-0")}>
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex-1 py-3 text-ink",
            depth === 0
              ? "px-4 text-sm font-semibold tracking-wide"
              : depth === 1
                ? "pl-8 pr-4 text-sm text-ink/90"
                : "pl-12 pr-4 text-sm text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
        {item.children && (
          <button
            type="button"
            aria-label={`Mở rộng ${item.label}`}
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
            className="px-4 py-3 text-ink"
          >
            <ChevronDown
              className={cn("size-4 transition-transform", expanded && "rotate-180")}
            />
          </button>
        )}
      </div>
      {item.children && expanded && (
        <div className="flex flex-col bg-muted/60 pb-1">
          {item.children.map((child) => (
            <MobileNavItem
              key={child.label}
              item={child}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
