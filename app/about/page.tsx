import type { Metadata } from "next";
import content from "@/data/content.json";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Skills } from "@/components/Skills";
import type { Content } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description: "About Jakub Heidtke, a full-stack software engineer specializing in scalable production systems.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const { profile, navigation, about, footer } = content as Content;

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fffafc] text-gray-900">
      <Navbar profile={profile} navigation={navigation} />

      <main>
        <Section className="relative overflow-hidden border-b border-gray-200/80 pt-20 pb-16 sm:pt-24">
          <div className="absolute top-0 right-0 -z-10 h-72 w-2/3 rounded-full bg-brand-100/65 blur-3xl" />
          <Reveal>
            <h1 className="mt-4 text-5xl leading-[0.98] font-black tracking-[-0.055em] text-gray-950 sm:text-6xl">
              {about.heading}
            </h1>
          </Reveal>
        </Section>

        <Section className="pt-14 pb-20">
          <div>
            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={`${index}-${paragraph}`} delay={index * 0.06}>
                <p className="mt-5 max-w-3xl text-[1.05rem] leading-8 text-gray-600 first:mt-0">{paragraph}</p>
              </Reveal>
            ))}

            {about.summaryPoints.length > 0 && (
              <ul className="mt-5 list-inside list-disc space-y-1 text-sm text-gray-700">
                {about.summaryPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>

          <Reveal className="mt-14 border-t border-gray-200 pt-12">
            <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-950">Skills</h2>
            <Skills skills={about.skills} />
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name}. {footer.text}
      </footer>
    </div>
  );
}
