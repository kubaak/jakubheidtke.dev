import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/cn";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("rounded-2xl border bg-white/70 p-6 shadow-sm", className)} {...props} />;
}
