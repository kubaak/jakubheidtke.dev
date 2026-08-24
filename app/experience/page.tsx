import type { Metadata } from "next";
import content from "@/data/content.json";
import { Card } from "@/components/Card";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { Content } from "@/data/content";

function timelineDate(period: string) {
  return period.split("|")[0].trim();
}

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional software engineering experience of Jakub Heidtke.",
  alternates: {
    canonical: "/experience",
  },
};

export default function ExperiencePage() {
  const { profile, navigation, experience, footer } = content as Content;

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fffafc] text-gray-900">
      <Navbar profile={profile} navigation={navigation} />

      <main>
        <Section className="relative overflow-hidden border-b border-gray-200/80 pt-20 pb-16 sm:pt-24">
          <div className="absolute top-0 right-0 -z-10 h-72 w-2/3 rounded-full bg-brand-100/65 blur-3xl" />
          <Reveal>
            <h1 className="mt-4 text-5xl leading-[0.98] font-black tracking-[-0.055em] text-gray-950 sm:text-6xl">
              {experience.heading}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              A timeline of roles and the engineering work I&apos;ve built or contributed to.
            </p>
          </Reveal>
        </Section>

        <Section className="pt-14 pb-20">
          <div className="space-y-4 border-l border-brand-200 pl-5 sm:pl-7">
            {experience.items.map((item, index) => (
              <Reveal
                key={`${item.role}-${item.company ?? "independent"}-${item.period}`}
                delay={Math.min(index * 0.05, 0.2)}
                className="relative"
              >
                <span className="absolute top-2 -left-[1.72rem] size-3 rounded-full border-2 border-brand-600 bg-[#fffafc] sm:-left-[2.22rem]" />
                <p className="text-sm font-semibold text-brand-700">{timelineDate(item.period)}</p>
                <Card className="border-gray-200 bg-white p-6 shadow-none transition-shadow hover:shadow-lg hover:shadow-brand-900/5">
                  <h2 className="text-lg font-bold tracking-tight text-gray-950">
                    {item.role}
                    {item.company && ` at ${item.company}`}
                  </h2>

                  <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm leading-6 text-gray-600">
                    {item.highlights.map((highlight, highlightIndex) => (
                      <li key={`${highlightIndex}-${highlight}`}>{highlight}</li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>
      </main>

      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name}. {footer.text}
      </footer>
    </div>
  );
}
