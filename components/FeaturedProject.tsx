import Link from "next/link";
import { cn } from "@/lib/cn";
import { Card } from "./Card";

interface FeaturedProjectProps {
  name: string;
  description: string;
  detailsHref: string;
}

export function FeaturedProject({ name, description, detailsHref }: FeaturedProjectProps) {
  return (
    <Card className="group ring-2 ring-brand-200 transition hover:ring-brand-400">
      <h3 className="text-lg font-semibold">{name}</h3>

      <p className="mt-2 text-sm text-gray-600">{description}</p>

      <div className="mt-4">
        <Link
          href={detailsHref}
          aria-label={`View details for ${name}`}
          className={cn(
            "group/link inline-flex items-center gap-1.5 rounded-md border border-transparent px-3 py-1.5",
            "text-sm font-medium text-brand-700 transition-all duration-200",
            "group-hover:border-brand-300 group-hover:bg-brand-100 group-hover:shadow-sm",
            "hover:scale-105 hover:border-brand-400 hover:bg-brand-200 hover:shadow-sm",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
          )}
        >
          Project details
          <span aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
            →
          </span>
        </Link>
      </div>
    </Card>
  );
}
