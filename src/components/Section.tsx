import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/cn";

export function Section({ className, ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={cn("mx-auto max-w-6xl px-4 py-12", className)} {...props} />;
}
