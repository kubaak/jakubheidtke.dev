import type { Course } from "@/data/content";
import { Card } from "./Card";

export function CourseCard({ name, topics, certificateUrl }: Course) {
  return (
    <Card className="bg-white/50 p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        {certificateUrl && (
          <a
            href={certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View completion certificate for ${name}`}
            title="View completion certificate"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-semibold text-gray-600 transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
          >
            ↗
          </a>
        )}
      </div>

      {topics && topics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span key={topic} className="rounded-full border bg-white px-2.5 py-1 text-xs text-gray-600">
              {topic}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}
